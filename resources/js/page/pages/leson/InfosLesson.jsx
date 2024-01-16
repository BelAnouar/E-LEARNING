import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import ReactPlayer from "react-player";
import video from "../../../../../public/storage/files/ART.mp4"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Payement from '../../components/modalPayement';
import { useQuery } from 'react-query';
import { getWeeks } from '../../lib/weeks';
import { getFiles } from '../../lib/Files';
import VideoLesson from './VideoLesson';

export default function Info(props) {
   const {idCour}=props

   
  const { data, isLoading, isError } = useQuery(['weeks', idCour], getWeeks);
  const { data: filesData, isLoading: filesLoading, isError: filesError } = useQuery('files', getFiles);

 
  if(isLoading|| filesLoading) return <div class="position-absolute top-50 start-50 translate-middle"></div>
  if(isError || filesError) return <div>Error</div>

   const [linkLesson,setLinkLesson]=React.useState(filesData[0].File)
   const handleclick=(e)=>{
    e.preventDefault()
    setLinkLesson(e.target.getAttribute('href'));
   }
    
  return (<section className='container'>
     
    <div className='row'>
    <div className='col-4 ms-4 '>
    {/* <Accordion disableGutters square >
        <AccordionSummary sx={{backgroundColor:'rgba(0, 0, 0, .03)'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  > <CreateNewFolderIcon  sx={{ color:'#944CBF',mr:2,mb:1 }}  />
            Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{borderTop: '1px solid rgba(0, 0, 0, .125)'}}>
          
            <ul className='navbar-nav ms-3'>
              <li className='nav-item'> <a className='nav-link' href='#'>
              Lorem ipsum dolor sit amet consectetur</a></li>
              <li className='nav-item'><a className='nav-link' href='#'>
              Lorem ipsum dolor sit amet consectetur</a></li>
              <li className='nav-item'><a className='nav-link' href='#'>
              Lorem ipsum dolor sit amet consectetur</a></li>
              <li className='nav-item'><a className='nav-link' href='#'>
              Lorem ipsum dolor sit amet consectetur</a></li>
            </ul>
        
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
          <Typography >
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
      </Accordion> */}



      {data.map((week,index)=>{
        return(<>
     
          <Accordion disableGutters square key={index} >
        <AccordionSummary sx={{backgroundColor:'rgba(0, 0, 0, .03)'}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography  > <CreateNewFolderIcon  sx={{ color:'#944CBF',mr:2,mb:1 }}  />
           {week.titre}</Typography>
        </AccordionSummary><ul className='navbar-nav'>
        {filesData.map((Item,index)=>{
          if(week.idweek!==Item.idWeek)return false;
          return(
             <AccordionDetails key={index} sx={{borderTop: '1px solid rgba(0, 0, 0, .125)'}}>
          
            
              <li className='nav-item'> <a href={Item.File} className='' onClick={handleclick}>
              {Item.File}</a></li>
              
           
        
        </AccordionDetails>
          )
        })}
        </ul>
      </Accordion>
    </>
        )
      })}


      
      

    </div>
    <VideoLesson/>
    </div></section>
  );
}
