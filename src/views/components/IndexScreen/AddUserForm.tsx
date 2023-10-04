import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Locations } from '../../../../constants'

const AddUserForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="Enter Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" placeholder="Enter Phone" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Location</Form.Label>
        <Form.Select>
          console.log('Locations', Locations )
          {Object.values(Locations).map((location: string) => {
            return <option>{location}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRadioTypes">
        <Form.Label>Select User Type</Form.Label>
        <Form.Check type="radio" label="Donor" />
        <Form.Check type="radio" label="Receiver" />
        <Form.Text className="text-muted">
          Choose whether you want to donate items to receive items.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="confirm-password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AddUserForm
