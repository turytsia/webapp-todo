import React, { useContext, useState } from 'react'
import classes from "./Login.module.css"
import Input from '../Input/Input'
import Button from '../Button/Button'
import AuthPage from '../AuthPage/AuthPage'
import { AuthContext } from '../../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { onLogin } = useContext(AuthContext)

  const navigate = useNavigate()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")


  const onLoginHandler = async () => {
    const error = await onLogin(username, password)
    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <AuthPage
      title='Login'
      message={error}
      setMessage={setError}
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
        <Button type={["color"]} onClick={onLoginHandler}>Login</Button>
      </div>
    </AuthPage>
  )
}

export default Login