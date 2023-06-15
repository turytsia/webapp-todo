import React, { useContext, useState } from 'react'
import classes from "./Login.module.css"
import Input from '../Input/Input'
import Button from '../Button/Button'
import AuthPage from '../AuthPage/AuthPage'
import useFetch from '../../hooks/use-fetch'
import { AuthContext } from '../../context/AuthProvider'

const Login = () => {

  const { onLogin } = useContext(AuthContext)
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")


  return (
    <AuthPage
      title='Login'
      subtitle={
        <>
          Doesn't have an account yet?
          < Button link to="/auth/register" > Sign Up</Button >
        </>
      }>
      <Input
        value = {username}
        placeholder='Username'
        text='Username'
        onChange={e => setUsername(e.target.value)}/>
      <Input
        value = {password}
        placeholder='********'
        type='password'
        text='Password'
        onChange={e => setPassword(e.target.value)}/>
      <div className={classes.actions}>
        <Button type={["color"]} onClick={() => onLogin(username, password)}>Login</Button>
      </div>
    </AuthPage>
  )
}

export default Login