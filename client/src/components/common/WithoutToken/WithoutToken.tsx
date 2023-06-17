import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import { Navigate } from "react-router-dom"

type propsType = {
    children: React.ReactNode
}

const WithoutToken = (props: propsType) => {

    const { isAuth } = useContext(AuthContext)

    if (isAuth) {
        return <Navigate to="/" />
    }

    return <>{props.children}</>
}

export default WithoutToken
