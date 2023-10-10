import styled from 'styled-components'
import useUserContext from '../../../controllers/context/useUserContext';

import { UserTypes } from '../../../../constants';
import DonorCard from './DonorCard';
import ReceiverCard from './ReceiverCard';

const Account = () => {
    const {isLoggedIn, currentUser} = useUserContext();
    return (
        <PageContainer>
            {currentUser && currentUser.userType === UserTypes.DONOR ? <DonorCard/> : currentUser && currentUser.userType === UserTypes.RECEIVER ? <ReceiverCard/>: <div>Loading....</div>}
        </PageContainer>
    )
}

export default Account

const PageContainer = styled.div`
  display: flex;
  background-color: orange;
  height: 100%;
  width: 100%;
`