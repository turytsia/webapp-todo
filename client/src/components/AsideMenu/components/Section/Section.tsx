import React, { useState } from 'react'
import classes from "./Section.module.css"
import { Icon } from '@iconify/react'
import classNames from 'classnames'

type propsType = {
    children: React.ReactNode
    text: string
    className?: string
}

const Section = ({
    children,
    text,
    className
}: propsType) => {
    const [isActive, setIsActive] = useState<boolean>(true)

    const onClick = () => {
        setIsActive(prev => !prev)
    }

    const listStyle = classNames(classes.list, className)
    const arrowStyle = classNames(classes.icon, { [classes.iconActive]: isActive })

    return (
        <>
            <div className={classes.container}>
                {text}
                <Icon icon="ep:arrow-up-bold" className={arrowStyle} onClick={onClick} />
            </div>
            <div className={listStyle}>{isActive && children}</div>
        </>
    )
}

export default Section