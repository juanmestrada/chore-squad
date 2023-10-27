import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import './Nav.css';
import logo from "../../assets/logo.png";

import { useAuth } from "../../context/UserContext";


const CustomNav = () => {
    const { user, logout } = useAuth();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleInboxClick = () => {
        setShow(false);
        navigate(`/chore-squad/map/inbox`);
    }
    const handleEditProfileClick = () => {
        setShow(false);
        navigate("/chore-squad/map/edit_profile");
    }
    const handleProfileClick = () => {
        setShow(false);
        navigate(`/chore-squad/map/${user?.username}`);
    }
    return(
        <div className='Nav'>
            <Container className="h-100">
                <div className='Nav-logo'>
                    <div className='m-auto'><img src={logo} alt='logo' height="24px" /> ChoreSquad</div>

                    <Button onClick={handleShow} bsPrefix="Nav-btn">
                        <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="false"><path stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M4 7h22M4 15h22M4 23h22"></path></svg>
                    </Button>
                </div> 
            </Container>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='Nav-Link'>
                        <div className='Nav-Link-a' onClick={handleInboxClick}>
                            <svg viewBox="0 0 24 24" className="nav-link-icon-svg"><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>
                            Inbox
                        </div>
                    </div>
                    <div className='Nav-Link'>
                        <div className='Nav-Link-a' onClick={handleProfileClick}>
                            <svg viewBox="0 0 24 24" className="nav-link-icon-svg"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>
                            {user && (<span>{user.id}</span>)}
                        </div>
                    </div>
                    <div className='Nav-Link'>
                        <div className='Nav-Link-a' onClick={handleEditProfileClick}>
                            <svg className="nav-link-icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            Edit profile
                        </div>
                    </div>
                    <div className='Nav-Link'>
                        <div className='Nav-Link-a' onClick={() => logout.mutate()}>
                            <svg height="24" viewBox="0 0 24 24" className="nav-link-icon-svg" ><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                            Sign out
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default CustomNav;