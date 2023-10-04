import { Modal, Button } from 'react-bootstrap'
import AddUserForm from './AddUserForm';

interface IProps {
  show: boolean;
  handleClose: () => void;
}

const AddUserModal = ({show, handleClose}: IProps) => {
    return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create An Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddUserForm/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {/* <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button> */}
      </Modal.Footer>
    </Modal>)
}

export default AddUserModal