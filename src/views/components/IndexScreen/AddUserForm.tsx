import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Locations, UserTypes } from '../../../../constants'
import { handleSubmit } from '../../../controllers/IndexScreen/addUserController'
import { useState } from 'react'

const AddUserForm = () => {
  const [currentRadio, setCurrentRadio] = useState<string>(UserTypes.DONOR)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRadio(e.target.value)
  }
  return (
    <Form className="add-user-form" onSubmit={(e) => handleSubmit(e, currentRadio)}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" name="name"  placeholder="Enter Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" name="phone" placeholder="Enter Phone" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Location</Form.Label>
        <Form.Select name="locations">
          {Object.values(Locations).map((location: string, i: number) => {
            return <option key={i}>{location}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRadioTypes">
        <Form.Label>Select User Type</Form.Label>
        <Form.Check 
        id="add-user-form-donor-radio" 
        type="radio" 
        label="Donor" 
        name="user-type" 
        value={UserTypes.DONOR}
        onChange={handleChange}
        defaultChecked
         />
        <Form.Check
          id="add-user-form-reciever-radio"
          type="radio"
          label="Receiver"
          name="user-type"
          value={UserTypes.RECEIVER}
          onChange={handleChange}
        />
        <Form.Text className="text-muted">
          Choose whether you want to donate items to receive items.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" autoComplete="on" name="password"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" 
        placeholder="Confirm Password" autoComplete="on"  name="confirm-password"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AddUserForm
