import React, { useContext, useState } from 'react'
import classes from './Register.module.css'
import AuthPage from '../AuthPage/AuthPage'
import Button from '../Button/Button'
import Input from '../Input/Input'
import { AuthContext } from '../../context/AuthProvider'

export const Register = () => {

    const { onRegister } = useContext(AuthContext)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return (
        <AuthPage
            title='Sign Up'
            subtitle={
                <>
                    Already have an account?
                    <Button link to="/auth/login">Login</Button>
                </>
            }>
            <Input
                value={username}
                placeholder='Username'
                text='Username'
                onChange={e => setUsername(e.target.value)} />
            <Input
                value={password}
                placeholder='********'
                type='password'
                text='Password'
                onChange={e => setPassword(e.target.value)} />
            <div className={classes.actions}>
                <Button type={["color"]} onClick={() => onRegister(username, password)}>Sign Up</Button>
            </div>
        </AuthPage>
    )
}
