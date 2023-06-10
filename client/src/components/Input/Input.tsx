import React from 'react'
import classes from "./Input.module.css"

type propsType = {
    placeholder?: string
    type?: string
    name?: string
    text?: string
    value?: string
}

const Input = ({
    placeholder,
    type,
    name,
    text,
    value
}: propsType) => {
    return (
        <div className = {classes.container}>
            {text && <label className={classes.label} htmlFor={name}>{text}</label>}
            <input
                name={name}
                className={classes.input}
                placeholder={placeholder}
                type={type}
                value={value} />
        </div>
    )
}

export default Input