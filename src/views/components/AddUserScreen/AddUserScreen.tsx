import styled from 'styled-components'
import { handleSubmit } from '../../../controllers/IndexScreen/addUserController.ts'
import { UserTypes } from '../../../../constants.ts'


const AddUser = () => {
  return (
    <PageContainer>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">email</label>
        <input type="text" name="email" id="email" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <input type="submit" value="Login" />
      </form>
    </PageContainer>
  )
}
export default AddUser

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: red;
  height: 100%;
  width: 100%;
`
