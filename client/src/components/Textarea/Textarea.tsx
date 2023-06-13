import React from 'react'
import classes from "./Textarea.module.css"

type propsType = {
    placeholder?: string
    name?: string
    text?: string
    value?: string
}

const Textarea = ({
    text,
    value,
    name,
    placeholder
}: propsType) => {
    return (
        <div className={classes.container}>
            {text && <label className={classes.label} htmlFor={name}>{text}</label>}
            <textarea
                name={name}
                className={classes.textarea}
                placeholder={placeholder}
                value={value} />
        </div>
    )
}

export default Textarea