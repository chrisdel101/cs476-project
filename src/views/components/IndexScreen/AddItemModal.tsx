import { Modal, Button } from 'react-bootstrap'
import AddItemForm from './AddItemForm';

interface IProps {
  show: boolean;
  handleClose: () => void;
}

const AddItemModal = ({show, handleClose}: IProps) => {
    return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add An Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddItemForm/>
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

export default AddItemModal