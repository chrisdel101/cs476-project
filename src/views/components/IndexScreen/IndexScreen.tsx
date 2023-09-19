import styled from "styled-components"
import useUserAutentication from "../../../controllers/hooks/authenitication/useIsUserAuthenicated"

const Index = () => {
    const isLoggedIn  = useUserAutentication();
    console.log(isLoggedIn, "isLoggedIN")
    return <PageContainer>
    {
        // some space fillers - to be replaced
        Array.from(Array(3)).map((_,i) => {
            return(<div  key={i} style={{ border: "5px white solid" }}>
            <img  src={"https://place-puppy.com/200x200"}/>
            </div>)
        })
    }
       
    </PageContainer>
}
export default Index

const PageContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: blue;
    height: 100%;
    width: 100%;
    
`