import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { ItemTypes, Locations } from '../../../../constants'
import useUserContext from '../../../controllers/context/useUserContext'
import { handleSubmit } from '../../../controllers/IndexScreen/addItemController'
import { useState } from 'react'
import Item from '../../../models/Item'
interface IForm {
  handleCloseAddItemModal: () => void;
  setSuccessMsg: (str: string|undefined) => void;
  item?: Item
}
const UpsertItemForm = ({handleCloseAddItemModal, setSuccessMsg, item}: IForm) => {
  const [validated, setValidated] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string|undefined>(undefined)
  
  const [name, setName] = useState<string>(item?.name || '')
  const [desc, setDesc] = useState<string>(item?.description || '')
  const [location, setLocation] = useState<string>(item?.location || '')
  const [itemType, setItemType] = useState<string>(item?.itemType || '')

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
          currentUser,
          item
        })}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control required  name="item-name" placeholder="Enter Item Name" onChange={(e) => setName(e.target.value)} value={name}/> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control
          required
          name="description"
          placeholder="Add Item Description"
          onChange={(e) => setDesc(e.target.value)}  value={desc}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Location</Form.Label>
        <Form.Select required name="location" onChange={(e) => setLocation(e.target.value)}  value={location}>
          {Object.values(Locations).map((location: string, i: number) => {
            return <option key={i}>{location}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Item Category</Form.Label>
        <Form.Select required name="category" onChange={(e) => setItemType(e.target.value)} value={itemType}>
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

export default UpsertItemForm
