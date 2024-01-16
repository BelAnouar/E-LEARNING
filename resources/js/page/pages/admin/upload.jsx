import React, { useState, useEffect } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import { useMutation, useQueryClient } from 'react-query';
import { getFiles } from '../../lib/Files';

const Demo = (props) => {
  const { data } = props;

  const [documents, setDocuments] = useState([{ files: [] }]);
 


  const addFiles = (fileList, arr) => {
    const files = Array.from(fileList);

    arr.push(...files);
    setDocuments([...documents]);
  }

  const removeFile = (arr, idx) => {
    arr.splice(idx, 1);
    setDocuments([...documents]);
  };

  const handleSubmit=async(event)=>{
    event.preventDefault()
    await props.onhandleSubmit( data.idweek,documents) 
  //   event.preventDefault();
   
  //  documents[0].files.forEach((file) => {
  //   const {name,size,type,lastModified}=file 
  //   const formFile={name,size,type,lastModified} 
  //    dispatch(AddFilesAction({id,formFile}))
  //   // const {name,size,type,lastModified}=file
  //   // addMutation.mutate({idweek:id,name,size:(file.size / 1024 / 1024).toPrecision(2),type,lastModified:new Date(file.lastModified).toLocaleDateString(),File:file})
  //  })
  }
 
  return (
    <div className="container">
      <input
        type="file"
        className="mb-2"
        onChange={(e) => addFiles(e.target.files, documents[0].files)}
      />

      <div className="panel-group">
        {documents.map((doc, index) => (
          <div className="panel panel-default xlist" key={index}>
            <div>{data.idweek}</div>
            <form id={`collapse${index}`} className="panel-collapse ">
              <div className="panel-body">
                <ul className="list-group">
                  <li className="list-group-item list-group-item-info">
                    <div className="row">
                      <div className="col-lg-1 col-md-1 col-sm-3 col-xs-3">Sort</div>
                      <div className="col-lg-4 col-md-4 col-sm-7 col-xs-7">Name</div>
                      <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">Size (MB)</div>
                      <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">Type</div>
                      <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">Modified on</div>
                      <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2"></div>
                    </div>
                  </li>
                  {doc.files.length === 0 && (
                    <li className="list-group-item">Drop Images or PDFs files here.</li>
                  )}
                  {doc.files.map((fileWithProgress, fileIndex) => (
                    <li className="list-group-item xlist" key={fileIndex}>
                      <div className="row">
                        <div className="col-lg-1 col-md-1 col-sm-3 col-xs-3">
                          <div className="row">
                            <div className="col-xs-4" style={{ paddingTop: '5px' }}>
                              <SortIcon />
                            </div>
                           
                          </div>
                        </div>
                        <div className="col-lg-11 col-md-11 col-sm-7 col-xs-7">
                          <div className="row">
                            <div className="col-lg-5 col-md-5 col-sm-11 col-xs-10 wraptext">
                              {fileWithProgress.name}
                            </div>
                            <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">
                              {(fileWithProgress.size / 1024 / 1024).toPrecision(2)}
                            </div>
                            <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">
                              {fileWithProgress.type}
                            </div>
                            <div className="col-lg-2 col-md-2 hidden-sm hidden-xs">
                              {new Date(fileWithProgress.lastModified).toLocaleDateString()}
                            </div>
                            <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2">
                              <button
                                type="button"
                                className="btn btn-xs btn-danger"
                                onClick={() => removeFile(doc.files, fileIndex)}
                              >
                                <span>
                                  <i className="fa fa-trash"></i>
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                   
                    </li>
                  ))}
                </ul>
                <button  onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Demo;
