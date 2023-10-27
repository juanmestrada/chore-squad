import "./Notfound.css";
import Sadface from "../../assets/sad-face.svg";

const NotFound = () => {
    return(
        <div className="NotFound">
            <img src={Sadface} alt="sad face"/>
            <p className="NotFound-text">404</p>
            <h3>Page not found</h3>
            <p className="NotFound-secondary">The page you are looking for doesn't exist or something went wrong.</p>
        </div>
    )
}

export default NotFound;