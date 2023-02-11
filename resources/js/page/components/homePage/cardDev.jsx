import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { AspectRatio, CardCover, Typography } from "@mui/joy";
import { purple } from "@mui/material/colors";
import WorkIcon from "@mui/icons-material/Work";
import ReactPlayer from "react-player";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
const CardDev = () => {
    return (
        <section id="testimonials">
            <h2 class="text-center mb-5">75,055 Satisfied Developers</h2>
            <div className="row">

                                                                     {/* first Card */}
            
                     <div className="col-lg-3 col-md-5">
                    <div
                        class="card rounded pt-2 "
                        style={{
                            background: "#F2F0EF",
                            width: "fit-content",
                      
                        }}
                    >
                        <AspectRatio
                            variant="soft"   ratio="6/3.8"
                            sx={{ p: 1, borderRadius: "sm" , width:267,boxShadow:"12%",  }}
                        >
                            <CardCover >
                             <ReactPlayer  width="100%"  height="100%"
                             url='https://www.youtube.com/watch?v=vOSpZwftRhg' />
                            
                            </CardCover>
                        </AspectRatio>

                        <div class="card-body mt-2">
                        <div class="card-title mb-3 ">
                               <Typography  level="body2" sx={{textTransform:'uppercase' ,fontSize:"12px"  ,color:'#944CBF',mr:1}}>
                               <Typography>
                                <WorkIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }}/> Fontend Developers </Typography>

                                <Typography> <FmdGoodIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }}/> Remote</Typography>

                                <Typography> <MonetizationOnIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }} /> *****$ Salary</Typography>
                               
                                </Typography>
                            </div>


                            <p class="card-text mb-5  text-muted">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </p>
                            <a href="#" class="card-link">
                                <GitHubIcon sx={{ color: purple[600] }} />
                            </a>
                            <span sx={{ color: purple[600] }} className="mx-2">
                                |
                            </span>
                            <a href="#" class="card-link">
                                <LinkedInIcon sx={{ color: purple[600] }} />
                            </a>
                        </div>
                    </div>
                </div>
                                                                      {/* second Card */}
                <div className="col-lg-3 col-md-5">
                    <div
                        class="card rounded pt-2 "
                        style={{
                            background: "#F2F0EF",
                            width: "fit-content",
                      
                        }}
                    >
                        <AspectRatio
                            variant="soft"   ratio="6/3.8"
                            sx={{ p: 1, borderRadius: "sm" , width:267,boxShadow:"12%"  }}
                        >
                            <CardCover >
                             <ReactPlayer  width="100%"  height="100%"
                             url='https://www.youtube.com/watch?v=vOSpZwftRhg' />
                            
                            </CardCover>
                        </AspectRatio>

                        <div class="card-body mt-2">
                        <div class="card-title mb-3 ">
                               <Typography  level="body2" sx={{textTransform:'uppercase' ,fontSize:"12px"  ,color:'#944CBF',mr:1}}>
                               <Typography>
                                <WorkIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }}/> Fontend Developers </Typography>

                                <Typography> <FmdGoodIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }}/> Remote</Typography>

                                <Typography> <MonetizationOnIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }} /> *****$ Salary</Typography>
                               
                                </Typography>
                            </div>


                            <p class="card-text  text-muted mb-5">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </p>
                            <a href="#" class="card-link">
                                <GitHubIcon sx={{ color: purple[600] }} />
                            </a>
                            <span sx={{ color: purple[600] }} className="mx-2">
                                |
                            </span>
                            <a href="#" class="card-link">
                                <LinkedInIcon sx={{ color: purple[600] }} />
                            </a>
                        </div>
                    </div>
                </div>
 
                                                                     {/*   third card */}

                <div className="col-lg-3 col-md-5">
                    <div
                        class="card rounded pt-2 "
                        style={{
                            background: "#F2F0EF",
                            width: "fit-content",
                      
                        }}
                    >
                        <AspectRatio
                            variant="soft"   ratio="6/3.8"
                            sx={{ p: 1, borderRadius: "sm" , width:267,boxShadow:"12%"  }}
                        >
                            <CardCover >
                             <ReactPlayer  width="100%"  height="100%"
                             url='https://www.youtube.com/shorts/nkRpieB2-ME' />
                            
                            </CardCover>
                        </AspectRatio>

                        <div class="card-body mt-2">
                        <div class="card-title mb-3 ">
                               <Typography  level="body2" sx={{textTransform:'uppercase' ,fontSize:"12px"  ,color:'#944CBF',mr:1}}>
                               <Typography>
                                <WorkIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }}/> Fontend Developers </Typography>

                                <Typography> <FmdGoodIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }}/> Remote</Typography>

                                <Typography> <MonetizationOnIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }} /> *****$ Salary</Typography>
                               
                                </Typography>
                            </div>


                            <p class="card-text  text-muted mb-5">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </p>
                            <a href="#" class="card-link">
                                <GitHubIcon sx={{ color: purple[600] }} />
                            </a>
                            <span sx={{ color: purple[600] }} className="mx-2">
                                |
                            </span>
                            <a href="#" class="card-link">
                                <LinkedInIcon sx={{ color: purple[600] }} />
                            </a>
                        </div>
                    </div>
                </div>


                                                                     {/* last card */}

                
                                                                     <div className="col-lg-3 col-md-5">
                    <div
                        class="card rounded pt-2 "
                        style={{
                            background: "#F2F0EF",
                            width: "fit-content",
                      
                        }}
                    >
                        <AspectRatio
                            variant="soft"   ratio="6/3.8"
                            sx={{ p: 1, borderRadius: "sm" , width:267,boxShadow:"12%"  }}
                        >
                            <CardCover >
                             <ReactPlayer  width="100%"  height="100%"
                             url='https://www.youtube.com/watch?v=vOSpZwftRhg' />
                            
                            </CardCover>
                        </AspectRatio>

                        <div class="card-body mt-2">
                            <div class="card-title mb-3 ">
                               <Typography  level="body2" sx={{textTransform:'uppercase' ,fontSize:"12px"  ,color:'#944CBF',mr:1}}>
                               <Typography>
                                <WorkIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }}/> Fontend Developers </Typography>

                                <Typography> <FmdGoodIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }}/> Remote</Typography>

                                <Typography> <MonetizationOnIcon fontSize="12" sx={{color:'#944CBF',mb:0.5 }} /> *****$ Salary</Typography>
                               
                                </Typography>
                            </div>

                            <p class="card-text  text-muted mb-5">
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </p>
                            <a href="#" class="card-link">
                                <GitHubIcon sx={{ color: purple[600] }} />
                            </a>
                            <span sx={{ color: purple[600] }} className="mx-2">
                                |
                            </span>
                            <a href="#" class="card-link">
                                <LinkedInIcon sx={{ color: purple[600] }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CardDev;
