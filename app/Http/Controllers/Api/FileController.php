<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\File;
use App\Http\Requests\StoreFileRequest;
use App\Http\Requests\UpdateFileRequest;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Storage; 
use Carbon\Carbon;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FileResource::collection(File::all());

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreFileRequest  $request
     * @return \Illuminate\Http\Response
     */
  public function store(StoreFileRequest $request)
{
    $data = $request->validated();
    $lastModified = Carbon::createFromTimestampMs($data['lastModified'])->toDateTimeString();

    $uploadedFile = $request->file('File');
    $fileName = uniqid() . '_' . $uploadedFile->getClientOriginalName();

    // Check MIME type to determine storage location
    if (str_starts_with($data['type'], 'video/')) {
     
        Storage::disk('minio')->putFileAs('videos', $uploadedFile, $fileName);
        $path = 'videos/' . $fileName;
        $storageType = 'minio';
    } else {
     
        $uploadedFile->storeAs('public/files', $fileName);
        $path = 'files/' . $fileName;
        $storageType = 'public';
    }

    $file = File::create([
        'idWeek' => $data['idWeek'],
        'File' => $path,
        'name' => $data['name'],
        'type' => $data['type'],
        'size' => $data['size'],
        'lastModified' => $lastModified
     
    ]);

    return response(new FileResource($file));
}


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateFileRequest  $request
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateFileRequest $request, File $file)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function destroy(File $file)
    {
        //
    }

    public function getFilesByWeek($idWeek)
{
    $files = File::where('idWeek', $idWeek)->get();
    return FileResource::collection($files);
}
}
