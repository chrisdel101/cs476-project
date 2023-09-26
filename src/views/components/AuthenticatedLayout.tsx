import { useCallback, useEffect, useState } from "react";
import useUserContext from "../../controllers/hooks/context/useUserContext";
import authFunctions from "../../api/authFunctions";
import styled from "styled-components";

interface IProps {
  children: any;
}

export const AuthenticatedLayout = ({ children }: IProps) => {
  const { isLoggedIn, user, setUser, setisLoggedIn } = useUserContext();
  
  const [isInitialized, setInitialized] = useState<boolean>(false);

  
  const signedInUser = useCallback(
    async () => {
      try {
        const checkUserAuth = await authFunctions.getSignInState();
        // TODO: build the user object from incoming data here
          console.log(signedInUser, "signedInUser");
          if (signedInUser) { 
          setisLoggedIn(true)
          setUser(signedInUser)
          } else {
            console.log('isSignedIn hook: USER IS NOT SIGNED IN')
            setisLoggedIn(false)
          }
      } catch (error) {
        console.log(error);
      }
    },
    [setisLoggedIn, setUser]
  );

  useEffect(() => {
   if(user && auth) {
      setInitialized(true);
    }
  }, [user, isLoggedIn]);

  if (!isInitialized) {
    return <LoadingContainer />;
  }

  return <AppContainer>{children}</AppContainer>;
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
