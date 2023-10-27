import { Dispatch, SetStateAction } from 'react';
import Toast from 'react-bootstrap/Toast';
import { CloseButton } from "react-bootstrap";
import "./SuccessAlert.css";

type SuccessAlertProps = {
    message: string
    clearmessage: Dispatch<SetStateAction<string | null>>
}

const SuccessAlert = ({message, clearmessage}: SuccessAlertProps) => {
    const handleClick = () => {
        clearmessage("");
    }
    return (
        <Toast bsPrefix="success-toast align-items-center border-0 text-white fw-bold" onClose={() => clearmessage("")} delay={6000} autohide>
            <div className="d-flex">
                <Toast.Body>
                    {message}
                </Toast.Body>

                <CloseButton className='btn-close btn-close-white me-2 m-auto' onClick={handleClick} aria-label="Close" data-bs-dismiss="success-toast"/>
            </div>
      </Toast>
    )
}

export default SuccessAlert;