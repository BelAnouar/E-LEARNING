import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ReactPlayer from "react-player";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Info() {
    
  return (<section className='container'>
  
    <div className='row'>
    <div className='col-4 ms-4 '>
    <Accordion disableGutters square >
        <AccordionSummary sx={{backgroundColor:'rgba(0, 0, 0, .03)'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  > <CreateNewFolderIcon  sx={{ color:'#944CBF',mr:2,mb:1 }}  />
            Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderTop: '1px solid rgba(0, 0, 0, .125)'}}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters square>
        <AccordionSummary  sx={{backgroundColor:'rgba(0, 0, 0, .03)'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography> <CreateNewFolderIcon  sx={{ color:'#944CBF',mr:2,mb:1 }}/> Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters square>
        <AccordionSummary  sx={{backgroundColor:'rgba(0, 0, 0, .03)'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography><CreateNewFolderIcon  sx={{ color:'#944CBF',mr:2,mb:1 }}/>f</Typography>
        </AccordionSummary>
      </Accordion>
      

    </div>
    <div className='col-md'>
    
    <ReactPlayer className="me-4"  width="100%"  
                             url='https://youtu.be/VIiS68XsaFU' />
    <div className='border-bottom border-primary'>
    <h2  className="mt-4 fw-bold mb-3 " style={{color:"#1D3774"}}  >Lorem ipsum dolor sit amet.</h2>
         </div>         

          <div className='border-bottom border-primary'>
    <h5 className="mt-4  mb-3" >Lorem ipsum is placeholder text commonly used in the graphic, print, 
    and publishing industries for previewing layouts and visual mockups.</h5>
         </div>  
         <div className='border-bottom border-primary'>
         <div className='mt-2'>
                 <p> Instructeur: <span>Name</span> </p>
                 <p> Participants actuels : <span>6 473</span> </p></div>
         </div> 
         <form className='text-end'>
         <button  className=" button text-light mt-3 p-2">Next Lesson <NavigateNextIcon/>
         </button></form>     
    </div>
    </div></section>
  );
}
