import React, { useState } from 'react'
import classes from "./Section.module.css"
import { Icon } from '@iconify/react'
import classNames from 'classnames'

type propsType = {
    children: React.ReactNode
    text: string
}

const Section = (props: propsType) => {
    const [isActive, setIsActive] = useState<boolean>(true)

    const onClick = () => {
        setIsActive(prev => !prev)
    }

    const arrowStyle = classNames(classes.icon, { [classes.iconActive]: isActive })

    return (
        <>
            <div className={classes.container}>
                {props.text}
                <Icon icon="ep:arrow-up-bold" className={arrowStyle} onClick={onClick} />
            </div>
            {isActive && <div className={classes.list}>{props.children}</div>}
        </>
    )
}

export default Section