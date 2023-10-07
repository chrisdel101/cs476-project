import { Button, InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { Locations, UserTypes } from '../../../../constants'
import { handleSubmit } from '../../../controllers/IndexScreen/addUserController'
import { useState } from 'react'

const AddUserForm = () => {
  const [currentRadio, setCurrentRadio] = useState<UserTypes>(UserTypes.DONOR)
  const [validated, setValidated] = useState(false)
  // if undefined feilds are blank, false if passwords dont match
  const [comparePasswords, setComparePassword] = useState<boolean | undefined>(
    undefined
  )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRadio(e.target.value as UserTypes)
  }

  return (
    <Form
      noValidate
      validated={validated}
      className="add-user-form"
      onSubmit={(e) =>
        handleSubmit({
          e,
          currentRadio,
          setValidated,
          setComparePassword,
        })
      }
    >
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type="name"
          name="user-name"
          placeholder="Enter Name"
        />
        <Form.Control.Feedback type="invalid">
          Cannot be blank.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          required
          type="email"
          name="email"
          placeholder="Enter email"
        />
        <Form.Control.Feedback type="invalid">
          Cannot be blank and must be in valid email format.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="phone" name="phone" placeholder="Enter Phone" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicLocationSelect">
        <Form.Label>Location</Form.Label>
        <Form.Select required name="location">
          {Object.values(Locations).map((location: string, i: number) => {
            return <option key={i}>{location}</option>
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRadioTypes">
        <Form.Label>Select User Type</Form.Label>
        <Form.Check
          required
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
        <Form.Control
          required
          type="password"
          placeholder="Password"
          autoComplete="on"
          name="password"
        />
        <Form.Control.Feedback type="invalid">
          Cannot be blank.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Confirm Password"
          autoComplete="on"
          name="confirm-password"
        />
        <Form.Control.Feedback type="invalid">
        {comparePasswords === false ? 'Passwords do not match.' : "Cannot be blank."}
        </Form.Control.Feedback>
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default AddUserForm
