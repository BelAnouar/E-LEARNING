
import { Link } from 'react-router-dom'
import Wrapper from '../wrappers/ErrorPage'

const Error=()=>{

    return(
        <Wrapper className='full-page' >
        <div>
            <img src="/images/logos/not-found.svg" alt='not-found'/>
            <h3> Page Not found &#128549;</h3>
            <p>We can't seem to find the page you're looking for</p>
            <Link className='btn btn-outline-primary' to='/'>
         
            back home </Link>
        </div></Wrapper>
    )

}

export default Error