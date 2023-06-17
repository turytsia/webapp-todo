import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import { Navigate } from "react-router-dom"

type propsType = {
    children: React.ReactNode
}

const WithToken = (props: propsType) => {

    const { isAuth } = useContext(AuthContext)

    if (!isAuth) {
        return <Navigate to="/auth/login" />
    }

    return <>{props.children}</>
}

export default WithToken
