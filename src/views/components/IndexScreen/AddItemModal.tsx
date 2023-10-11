import { Modal, Button } from 'react-bootstrap'
import AddItemForm from './AddItemForm';

interface IProps {
  show: boolean;
  handleClose: () => void;
  setSuccessMsg: (str: string|undefined) => void;
}

const AddItemModal = ({show, handleClose, setSuccessMsg}: IProps) => {
    return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Donate An Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddItemForm 
        handleCloseAddItemModal={handleClose} 
        setSuccessMsg={setSuccessMsg}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>)
}

export default AddItemModal