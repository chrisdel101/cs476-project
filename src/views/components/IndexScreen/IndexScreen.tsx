import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'


const Index = () => {
  const [show, setShow] = useState<boolean>(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  
  return (
    <PageContainer>
      <SytledButton variant="primary" onClick={handleShow}>
        Launch demo modal
      </SytledButton>
      <div className="demo-container" style={{display: "flex", justifyContent: "space-evenly"}}>
        {
            // some space fillers - to be replaced
            Array.from(Array(3)).map((_, i) => {
            return (
                <div key={i} style={{ border: '5px white solid' }}>
                <img src={'https://placekitten.com/200/200'} />
                </div>
            )
            })
        }
      </div>
      <div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add An Item </Modal.Title>
        </Modal.Header>
        <Modal.Body>Demo to show how modal works!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </PageContainer>
  )
}
export default Index

const PageContainer = styled.div`
    flex-direction: column;
  display: flex;
  justify-content: space-evenly;
  background-color: blue;
  height: 100%;
  width: 100%;
`
// eslint-disable-next-line @typescript-eslint/no-explicit-any 
// disable required for this styled component only
const SytledButton = styled(Button)<any>`
    width: 200px;
    align-self: center;
`
