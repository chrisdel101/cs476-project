import crudFunctions from "../../api/crudFunctions"

  export const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.currentTarget
    console.log(target.email.value)
    const email = target.email.value 
    const password = target.password.value

    const user = crudFunctions.addNewUser({
      email, password
    })
    console.log(user)
  }
