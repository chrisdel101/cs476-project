import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { ItemTypes, Locations } from '../../../../constants'
import useUserContext from '../../../controllers/context/useUserContext'
import { handleSubmit } from '../../../controllers/IndexScreen/addItemController'
import { useState } from 'react'
interface IForm {
  handleCloseAddItemModal: () => void;
  setSuccessMsg: (str: string|undefined) => void;
}
const AddItemForm = ({handleCloseAddItemModal, setSuccessMsg}: IForm) => {
  const [validated, setValidated] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string|undefined>(undefined)
  const {currentUser} = useUserContext();
  return (
    <Form
      noValidate
      validated={validated}
      className="add-item-form"
      onSubmit={(e) => 
        handleSubmit({
          e,
          setValidated,
          handleCloseAddItemModal,
          setSuccessMsg,
          setErrorMsg,
          currentUser
        })}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control required type="name" name="item-name" placeholder="Enter Item Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Description</Form.Label>
        <Form.Control
        required
          as="textarea"
          name="description"
          placeholder="Add Item Description"
          style={{ height: '50px' }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Location</Form.Label>
        <Form.Select required name="location">
          {Object.values(Locations).map((location: string, i: number) => {
            return <option key={i}>{location}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Item Category</Form.Label>
        <Form.Select required name="category">
          {Object.values(ItemTypes).map((category: string, i: number) => {
            return <option key={i}>{category}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUploadImage">
        <Button variant="primary">Upload Image</Button>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AddItemForm
