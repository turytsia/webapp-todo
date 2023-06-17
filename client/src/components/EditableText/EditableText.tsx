import React from 'react'
import classes from "./EditableText.module.css"
import classNames from 'classnames'

type propsType = {
    placeholder?: string
    name?: string
    value?: string
    className?: string
    readOnly?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EditableText = ({
    placeholder = "",
    name = "",
    value = "",
    className,
    readOnly = true,
    onChange
}: propsType) => {

    const inputStyles = classNames(classes.text, className, {
        [classes.editable]: !readOnly
    })

    return (
        <input
            className={inputStyles}
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
            name={name}
          />
    )
}

export default EditableText