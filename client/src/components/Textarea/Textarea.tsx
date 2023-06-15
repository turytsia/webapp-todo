import React from 'react'
import classes from "./Textarea.module.css"

type propsType = {
    placeholder?: string
    name?: string
    text?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea = ({
    text,
    value,
    name,
    placeholder,
    onChange
}: propsType) => {
    return (
        <div className={classes.container}>
            {text && <label className={classes.label} htmlFor={name}>{text}</label>}
            <textarea
                name={name}
                className={classes.textarea}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
        </div>
    )
}

export default Textarea