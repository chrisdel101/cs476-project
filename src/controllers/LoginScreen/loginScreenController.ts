import authFunctions from '../../api/authFunctions'


export const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
    // weird syntax only for typescript
    const target = e.currentTarget
    console.log(target.email.value)
    const email = target.email.value 
    const password = target.password.value
    authFunctions.loginUser(email, password) 
}

export const handleLogout = async () => {
  await authFunctions.logoutUser()
}
