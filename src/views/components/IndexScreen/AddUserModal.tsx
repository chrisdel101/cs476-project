import { Modal, Button } from 'react-bootstrap'
import AddUserForm from './AddUserForm';

interface IProps {
  show: boolean;
  handleClose: () => void;
  setSuccessMsg: (str: string|undefined) => void;
}

const AddUserModal = ({show, handleClose, setSuccessMsg}: IProps) => {
    return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create An Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddUserForm handleCloseAddUserModal={handleClose} setSuccessMsg={setSuccessMsg}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>)
}

export default AddUserModal