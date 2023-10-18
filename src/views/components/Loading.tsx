import AppSpinner from './Spinner'
import styled from 'styled-components'

const Loading = () => {
  return (
    <PageContainer className="loading">
      <p>Loading...</p>
      <AppSpinner />
    </PageContainer>
  )
}
export default Loading

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-items: center;
`
