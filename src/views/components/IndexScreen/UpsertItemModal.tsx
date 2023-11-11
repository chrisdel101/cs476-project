import { Modal, Button } from 'react-bootstrap'
import UpsertItemForm from './UpsertItemForm';
import Item from '../../../models/Item';
import { Observers } from '../../../../constants';

interface IProps {
  show: boolean;
  handleClose: () => void;
  setSuccessMsg: (str: string|undefined) => void;
  setErrorMsg: (str: string|undefined) => void;
  title: string;
  item?: Item;
  observerID: Observers;
}

const UpsertItemModal = ({show, handleClose, setSuccessMsg, title, item, observerID, setErrorMsg}: IProps) => {
    return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpsertItemForm 
        handleCloseAddItemModal={handleClose} 
        setSuccessMsg={setSuccessMsg}
        setErrorMsg={setErrorMsg}
        item={item} 
        observerID={observerID}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>)
}

export default UpsertItemModal