import React from 'react'
import classes from "./Login.module.css"
import Input from '../Input/Input'
import Button from '../Button/Button'
import AuthPage from '../AuthPage/AuthPage'

const Login = () => {
  return (
    <AuthPage
      title='Login'
      subtitle={
        <>
          Doesn't have an account yet?
          < Button link to="/auth/register" > Sign Up</Button >
        </>
      }>
      <Input placeholder='Username' text='Username' />
      <Input placeholder='********' type='password' text='Password' />
      <div className={classes.actions}>
        <Button type={["color"]}>Login</Button>
      </div>
    </AuthPage>
  )
}

export default Login