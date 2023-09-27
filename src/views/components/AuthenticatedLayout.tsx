import { useCallback, useEffect, useState } from "react";
import useUserContext from "../../controllers/context/useUserContext";
import authFunctions from "../../api/authFunctions";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

interface IProps {
  children: any;
}

export const AuthenticatedLayout = ({ children }: IProps) => {
    console.log("children", children )
  const { isLoggedIn, user, setUser, setisLoggedIn } = useUserContext();
  
  const [isInitialized, setInitialized] = useState<boolean>(false);

  
  const checkUserAuth = useCallback(
    async () => {
      try {
        const signedInUser = await authFunctions.getSignInState();
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
   if(!isLoggedIn) {
    if(routeType === "private") return <Redirect to="/" />;
    }
  }, [user, isLoggedIn]);

  if (!isInitialized) {
    // return <LoadingContainer />;
    console.log("loading");
  }

  return <AppContainer>{children}</AppContainer>;
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
