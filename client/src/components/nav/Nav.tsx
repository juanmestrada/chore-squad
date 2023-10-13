import './Nav.css';
import logo from "../assets/logo.png";

const Nav = () => {
    return(
        <div className='Nav'>
            <div className='Nav-logo'>{/* <img src={logo} alt='logo'/>*/ }<span>Chore Squad</span></div> 
        </div>
    )
}

export default Nav;