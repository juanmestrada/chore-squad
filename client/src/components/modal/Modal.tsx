import './Modal.css';
import { CloseButton, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"


type ModalProps = {
    modalTitle?: string;
    show: boolean;
    children: React.ReactNode;
}

const CustomModal = ({ modalTitle, show, children}: ModalProps) => { 
        
    return (
        <Modal dialogClassName="modal-dialog modal-dialog-scrollable" show={show} backdrop={true} >
            <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
                <Link to="/chore-squad/map/">
                    <CloseButton aria-label="Hide" />
                </Link>
            </Modal.Header>
            <Modal.Body className="p-0">
                {children}
            </Modal.Body>
            <Modal.Footer>
                <p className="fs-6 footer-text"><img src={logo} alt='logo'/> <span>ChoreSquad</span></p>
            </Modal.Footer>
        </Modal>
    )
    

}

export default CustomModal;
