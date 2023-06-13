import React from 'react'
import classes from "./EditableText.module.css"
import classNames from 'classnames'

type propsType = {
    placeholder?: string
    value?: string
    className?: string
    readOnly?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EditableText = ({
    placeholder = " ",
    value = " ",
    className,
    readOnly = true,
    onChange
}: propsType) => {
    return (
        <input
            className={classNames(classes.text, className)}
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
            style={{ width: (readOnly ? value.length : placeholder) + "ch"}}
          />
    )
}

export default EditableText