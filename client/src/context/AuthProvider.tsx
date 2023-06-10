import { createContext, useState } from "react"


type PropsType = {
    children: React.ReactNode
}

type tokenType = string | null

type ContextType = {
    isAuth: boolean
    token: tokenType
    onLogin: () => void
    onLogout: () => void
    onRegister: () => void
}

const initialContext: ContextType = {
    isAuth: false,
    token: null,
    onLogin: () => { },
    onLogout: () => { },
    onRegister: () => { },
}

const tokenKey = "token"

export const AuthContext = createContext<ContextType>(initialContext)

const AuthProvider = (props: PropsType) => {
    const [token, setToken] = useState<tokenType>(localStorage.getItem(tokenKey))

    const onLogin = async () => {
        console.log("login")
        localStorage.setItem(tokenKey, "1")
        setToken("1")
    }

    const onRegister = async () => {
        console.log("register")
        localStorage.setItem(tokenKey, "1")
        setToken("1")
    }

    const onLogout = async () => {
        console.log("logout")
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