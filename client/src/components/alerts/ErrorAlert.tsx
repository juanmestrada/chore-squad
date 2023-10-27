import { Dispatch, SetStateAction } from 'react';
import Toast from 'react-bootstrap/Toast';
import { CloseButton } from "react-bootstrap";
import "./ErrorAlert.css";

type ErrorAlertProps = {
    message: string
    clearmessage: Dispatch<SetStateAction<string | null>>
}

const ErrorAlert = ({message, clearmessage}: ErrorAlertProps) => {
    const handleClick = () => {
        clearmessage("");
    }
    return (
        <Toast bsPrefix="error-toast align-items-center border-0 text-white fw-bold" onClose={() => clearmessage("")} delay={6000} autohide>
            <div className="d-flex">
                <Toast.Body>
                    {message}
                </Toast.Body>

                <CloseButton className='btn-close btn-close-white me-2 m-auto' onClick={handleClick} aria-label="Close" data-bs-dismiss="error-toast"/>
            </div>
      </Toast>
    )
}

export default ErrorAlert;