import classNames from 'classnames'
import React, { useState } from 'react'

import classes from "./Message.module.css"
import { Icon } from '@iconify/react'

type propsType = {
    text: string
    type: 'ERROR' | 'OKAY'
    setText: (text: string) => void
}

const Message = ({
    text,
    setText = (text) => {},
    type
}: propsType) => {

    const messageStyle = classNames(classes.message, {
        [classes.error]: type === "ERROR",
        [classes.ok]: type === "OKAY",
        [classes.disabled]: text.length === 0
    })

    return (
        <div className={messageStyle}>
            <div className={classes.container}>
                <Icon icon={type === "ERROR" ? "material-symbols:warning-outline" : "grommet-icons:status-good"} width={20} height={20} />
                {text}
            </div>
            <Icon className={classes.iconClose} icon="basil:cross-outline" onClick = {() => setText("")} />
        </div>
    )
}

export default Message