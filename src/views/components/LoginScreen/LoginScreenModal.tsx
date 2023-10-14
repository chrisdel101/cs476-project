import { Modal, Button } from 'react-bootstrap'
import LoginScreenForm from './LoginScreenForm';

interface IProps {
  show: boolean;
  handleClose: () => void;
  setSuccessMsg: (str: string|undefined) => void;
}

const LoginScreenModal = ({show, handleClose, setSuccessMsg}: IProps) => {
    return(
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Login to Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LoginScreenForm handleCloseLoginScreenModal={handleClose} setSuccessMsg={setSuccessMsg}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
    </Modal>
    )
}

export default LoginScreenModal