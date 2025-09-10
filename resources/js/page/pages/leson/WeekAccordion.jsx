// WeekAccordion.jsx
import React from 'react';
import { useQuery } from 'react-query';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { getFilesByWeek } from '../../lib/Files';

export default function WeekAccordion({ week, selectedFile, setSelectedFile, isFree = true }) {
  const { data: weekFiles, isLoading, isError } = useQuery(
    ['filesByWeek', week.idweek],
    () => getFilesByWeek(week.idweek),
    {
      enabled: isFree, 
      staleTime: 5 * 60 * 1000, 
      cacheTime: 10 * 60 * 1000, 
    }
  );

  React.useEffect(() => {
    if (!selectedFile && weekFiles?.length > 0 && isFree) {
      setSelectedFile(weekFiles[0]);
    }
  }, [weekFiles, selectedFile, setSelectedFile, isFree]);

  const handleClick = (e, file) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFree) {
      setSelectedFile(file);
    }
  };

  
  if (!isFree) {
    return (
      <Accordion disableGutters square disabled>
        <AccordionSummary
          sx={{ 
            backgroundColor: 'rgba(0, 0, 0, .03)',
            opacity: 0.6,
            cursor: 'not-allowed'
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={`panel-${week.idweek}`}
        >
          <Typography>
            <CreateNewFolderIcon sx={{ color: '#944CBF', mr: 2, mb: 1 }} />
            {week.titre}
            <span className="badge bg-warning text-dark ms-2 small">Locked</span>
          </Typography>
        </AccordionSummary>
      </Accordion>
    );
  }

  return (
    <Accordion disableGutters square>
      <AccordionSummary
        sx={{ backgroundColor: 'rgba(0, 0, 0, .03)' }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={`panel-${week.idweek}`}
      >
        <Typography>
          <CreateNewFolderIcon sx={{ color: '#944CBF', mr: 2, mb: 1 }} />
          {week.titre}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ padding: 0 }}>
        {isLoading && (
          <div className="p-3 text-center">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 mb-0 small text-muted">Loading files...</p>
          </div>
        )}
        
        {isError && (
          <div className="p-3 text-center">
            <p className="text-danger mb-0 small">Error loading files</p>
          </div>
        )}

        {weekFiles && weekFiles.length > 0 && (
          <ul className='list-unstyled mb-0'>
            {weekFiles.map((file, fileIndex) => (
              <li key={file.idFiles || fileIndex} className="border-top">
                <a
                  href="#"
                  onClick={(e) => handleClick(e, file)}
                  className={`d-block px-3 py-2 text-decoration-none ${
                    selectedFile?.idFiles === file.idFiles 
                      ? 'bg-primary text-white' 
                      : 'text-dark hover-bg-light'
                  }`}
                  style={{
                    transition: 'background-color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedFile?.idFiles !== file.idFiles) {
                      e.target.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedFile?.idFiles !== file.idFiles) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <i className="fas fa-file-video me-2"></i>
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        )}

        {weekFiles && weekFiles.length === 0 && (
          <div className="p-3 text-center">
            <p className="text-muted mb-0 small">No files available</p>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}