import { createContext, useState } from "react"
import useFetch from "../hooks/use-fetch"
import { AxiosError } from "axios"
import { request } from "../axios"

export type errorResponseType = {
    message: string
} | null

type PropsType = {
    children: React.ReactNode
}

type tokenType = string | null

type ContextType = {
    isAuth: boolean
    onLogin: (username: string, password: string) => Promise<errorResponseType>
    onRegister: (username: string, password: string) => Promise<errorResponseType>
    onLogout: () => void
}

const initialErrorResponse: errorResponseType = {
    message: "Something went wrong..."
}

const initialContext: ContextType = {
    isAuth: false,
    onLogin: () => Promise.resolve(initialErrorResponse),
    onRegister: () => Promise.resolve(initialErrorResponse),
    onLogout: () => { },
}

export const tokenKey = "token"

export const AuthContext = createContext<ContextType>(initialContext)

const AuthProvider = (props: PropsType) => {
    const { get, post } = useFetch()
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem(tokenKey))

    const onLogin = async (username: string, password: string) => {
        try {
            const data = await post('/login/', { username, password })
            localStorage.setItem(tokenKey, data.token)
            setIsAuth(true)
            return null
        } catch (error) {
            const err = error as AxiosError
            if (err.response) {
                return err.response.data as errorResponseType
            } else {
                console.error(err)
                return initialErrorResponse
            }
        }
    }

    const onRegister = async (username: string, password: string) => {
        try {
            const data = await post('/auth/', { username, password })
            localStorage.setItem(tokenKey, data.token)
            setIsAuth(true)
            return null
        } catch (error) {
            const err = error as AxiosError
            if (err.response) {
                return err.response.data as errorResponseType
            } else {
                console.error(err)
                return initialErrorResponse
            }
        }
    }

    const onLogout = async () => {
        localStorage.removeItem(tokenKey)
        setIsAuth(false)
    }


    const value: ContextType = {
        isAuth,
        onLogin,
        onLogout,
        onRegister
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
