



import ReactPlayer from "react-player";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';






function VideoLesson (){
    return(
        <div className='col-md'>
    
    <ReactPlayer className="me-4 react-player"  width="100%"  
                              controls = {true}
/>
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
    )
}

export default VideoLesson