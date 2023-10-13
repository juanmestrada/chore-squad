import './Modal.css';
import { CloseButton, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import logo from "../../assets/logo.png"
import Profile from '../../pages/profile/Profile';

const CustomModal = ({ dogs, modalTitle}) => {
    
        
    return (
        <Modal dialogClassName="modal-dialog modal-dialog-scrollable" show={true} backdrop={false} >
            <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
                <Link to="/choresquad/map/">
                    <CloseButton aria-label="Hide" />
                </Link>
            </Modal.Header>
            <Modal.Body >
                <Profile />
            </Modal.Body>
            <Modal.Footer>
                <p className="fs-6 footer-text"><img src={logo} alt='logo'/> <span>Chore Squad</span></p>
            </Modal.Footer>
        </Modal>
    )
    

}

export default CustomModal;
