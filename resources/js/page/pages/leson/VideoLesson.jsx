import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
import ReactPlayer from "react-player";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function VideoLesson({ file }) {
  const [numPages, setNumPages] = React.useState(null);
  const [pdfError, setPdfError] = React.useState(false);
  const [pdfKey, setPdfKey] = React.useState(0);

  const getFileUrl = () => {
    if (!file || !file.File) return null;
    
     if (file.storage === 'minio' || file.File.startsWith('videos/')) {
    return `http://localhost:9000/local/${file.File}`;
  }

    if (file.File.startsWith('http') || file.File.startsWith('/')) {
      return file.File;
    }
    
   
    return `/storage/${file.File}`;
  };

  const fileUrl = getFileUrl();

  console.log("Constructed file URL:", fileUrl);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log("PDF loaded successfully");
    setNumPages(numPages);
    setPdfError(false);
  };

  const onDocumentLoadError = (error) => {
    console.error("PDF load error:", error);
    setPdfError(true);
  };

  // Force re-render when file changes
  React.useEffect(() => {
    setPdfKey(prevKey => prevKey + 1);
  }, [file]);

  const renderContent = () => {
    if (!file) {
      return (
        <div className="empty-state">
          <h3>No file selected</h3>
          <p>Please select a file from the sidebar</p>
        </div>
      );
    }

    if (file.type.includes('video')) {
      return (
        <div className="video-container">
          <ReactPlayer
            url={fileUrl}
            controls
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                },
              },
            }}
          />
        </div>
      );
    }

    if (file.type.includes('pdf')) {
      return (
        <div className="pdf-container">
          {pdfError ? (
            <div className="pdf-error">
              <p>Failed to load PDF preview.</p>
              <a href={fileUrl} download className="download-btn">
                Download PDF
              </a>
         
              <iframe 
                src={fileUrl}
                style={{ width: '100%', height: '500px', border: 'none' }}
                title="PDF Fallback"
              />
            </div>
          ) : (
            <Document
              key={pdfKey} 
              file={fileUrl} 
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<div className="pdf-loading">Loading PDF...</div>}
              error={<div className="pdf-error">Error loading PDF</div>}
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={600}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          )}
        </div>
      );
    }

    return (
      <div className="file-download">
        <p>This file type cannot be previewed.</p>
        <a href={fileUrl} download className="download-btn">
          Download {file.name}
        </a>
      </div>
    );
  };

  return (
    <div className="video-lesson-container">
      <div className="content-area">{renderContent()}</div>

     
    </div>
  );
}

export default VideoLesson;