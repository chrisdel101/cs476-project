import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { ItemTypes, Locations } from '../../../../constants'

const AddItemForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter Item Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Add Item Description"
          style={{ height: '100px' }}
        />
      </Form.Group>
     
      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Location</Form.Label>
        <Form.Select>
          {Object.values(Locations).map((location: string) => {
            return <option>{location}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Item Category</Form.Label>
        <Form.Select>
          {Object.values(ItemTypes).map((category: string) => {
            return <option>{category}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUploadImage">
      <Button variant="primary">
        Upload Image
      </Button>

      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AddItemForm
