import { createContext, useState } from "react"
import useFetch from "../hooks/use-fetch"


type PropsType = {
    children: React.ReactNode
}

type tokenType = string | null

type ContextType = {
    isAuth: boolean
    token: tokenType
    onLogin: (username: string, password: string) => void
    onLogout: () => void
    onRegister: (username: string, password: string) => void
}

const initialContext: ContextType = {
    isAuth: false,
    token: null,
    onLogin: () => { },
    onLogout: () => { },
    onRegister: () => { },
}

export const tokenKey = "token"

export const AuthContext = createContext<ContextType>(initialContext)

const AuthProvider = (props: PropsType) => {
    const { get, post } = useFetch()
    const [token, setToken] = useState<tokenType>(localStorage.getItem(tokenKey))

    const onLogin = async (username: string, password: string) => {
        try {
            const data = await post('/login/', { username, password })
            localStorage.setItem(tokenKey, data.token)
            setToken(data.token)
        } catch (error) {
            console.error(error)
        }
    }

    const onRegister = async (username: string, password: string) => {
        try {
            const data = await post('/auth/', { username, password })
            localStorage.setItem(tokenKey, data.token)
            setToken(data.token)
        } catch (error) {
            console.error(error)
        }
    }

    const onLogout = async () => {
        localStorage.removeItem(tokenKey)
        setToken(null)
    }

    
    const value: ContextType = {
        isAuth: !!token,
        token,
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