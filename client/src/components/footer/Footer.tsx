import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import "./Footer.css";

const Footer = () => {
    const navigate = useNavigate();

    const handleInboxClick = () => {
        navigate("/chore-squad/map/inbox");
    }
    const handleClick = () => {
        navigate("/chore-squad/map/edit_profile");
    }
    return (
        <div className="Footer">
            <Container className='Footer-Container'>
                <div className='Footer-Btn-Container'>
                    <div className='Footer-Btn' onClick={handleInboxClick}>
                        <svg viewBox="0 0 24 24" className="Footer-Btn-svg"><title>Inbox</title><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>
                    </div>

                    <div className='Footer-Btn' onClick={handleClick}>
                        <svg viewBox="0 0 24 24" className="Footer-Btn-svg"><title>Profile</title><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path></g></svg>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer;