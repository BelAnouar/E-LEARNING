import { Typography, Button } from "@mui/material"

const CardBooks = (props) => {
    const { books } = props.Book
    
    const handleDownload = (bookUrl) => {
       
        const pdfUrl = `${bookUrl}/pdf/`
        
        window.open(pdfUrl, '_blank')
    }

    return (
        <section id="press">
            <div className="container col-12 mb-4">
                <div className="text-info border-bottom border-info">
                    <Typography>Most Popular</Typography>
                </div>
            </div>
            <div className="row">
                {books.map((item) => {
                    return (
                        <div className="col-lg-3 col-md-5" key={item.id}>
                            <div className="card m-2">
                                <img src={item.image} className="card-img" alt={item.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">by {item.authors}</p>
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        onClick={() => handleDownload(item.url)}
                                    >
                                        Download PDF
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default CardBooks