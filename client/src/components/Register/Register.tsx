import React from 'react'
import classes from './Register.module.css'
import AuthPage from '../AuthPage/AuthPage'
import Button from '../Button/Button'
import Input from '../Input/Input'

export const Register = () => {
    return (
        <AuthPage
            title='Sign Up'
            subtitle={
                <>
                    Already have an account?
                    <Button link to="/auth/login">Login</Button>
                </>
            }>
            <Input placeholder='Username' text='Username' />
            <Input placeholder='********' type='password' text='Password' />
            <div className={classes.actions}>
                <Button type={["color"]}>Sign Up</Button>
            </div>
        </AuthPage>
    )
}
