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
    const [error, setError] = useState<string>("")


    const onLoginHandler = async () => {
        const error = await onRegister(username, password)
        if (error) {
            setError(error.message)
        }
    }

    return (
        <AuthPage
            title='Sign Up'
            message={error}
            setMessage={setError}
            subtitle={
                <>
                    Already have an account? <Button link to="/auth/login">Login</Button>
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
                <Button type={["color"]} onClick={onLoginHandler}>Sign Up</Button>
            </div>
        </AuthPage>
    )
}
