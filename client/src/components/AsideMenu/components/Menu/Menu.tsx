import React from 'react'
import classes from "./Menu.module.css"
import Button from '../../../Button/Button'
import { useLocation } from 'react-router-dom'

type propsType = {
    children: React.ReactNode
}

const Menu = (props: propsType) => {

    const { pathname } = useLocation()

    return (
        <aside className={classes.container}>
            <Button
                link
                type={['transparent', 'bold']}
                icon="mdi:about-circle-outline"
                isActive={pathname === "/about"}>
                About
            </Button>
            {props.children}
        </aside>
    )
}

export default Menu