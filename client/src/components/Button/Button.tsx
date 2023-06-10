import React from 'react'

import classes from "./Button.module.css"
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Icon } from '@iconify/react'


type buttonType = Array<
    "transparent" | "icon-right" | "bold" | "color">

type propsType = {
    children?: React.ReactNode
    link?: boolean
    to?: string
    onClick?: () => void
    type?: buttonType
    icon?: string
    isActive?: boolean
}

const Button = ({
    children,
    link = false,
    to,
    onClick = () => { },
    type = [],
    icon,
    isActive = false
}: propsType) => {


    const buttonStyle = classNames(link ? classes.link : classes.button, {
        [classes.transparentType]: type.includes("transparent"),
        [classes.iconRight]: type.includes("icon-right"),
        [classes.icon]: !!icon,
        [classes.boldType]: type.includes("bold"),
        [classes.iconOnly]: !children,
        [classes.active]: isActive,
        [classes.colorType]: type.includes("color"),
    })

    if (link) {
        return (
            <Link
                to={to ?? ""}
                className={buttonStyle}>
                {icon && <Icon icon={icon} />}
                {children}
            </Link>
        )
    }

    return (
        <button
            className={buttonStyle}
            onClick={onClick}>
            {icon && <Icon icon={icon} />}
            {children}
        </button>
    )
}

export default Button