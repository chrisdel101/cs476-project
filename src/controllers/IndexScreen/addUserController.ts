import crudFunctions from "../../api/crudFunctions"

  export const handleSubmit = (e:React.FormEvent<HTMLFormElement>, currentRadio: string) => {
    e.preventDefault()
    const target = e
    console.log(currentRadio)
    // console.log(target.email)
    // const email = target.email.value 
    // const password = target.password.value

   
    // console.log(email, password)
  }
