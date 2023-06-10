import React from 'react'
import classes from "./Main.module.css"

type propsType = {
    children: React.ReactNode
}

const Main = (props: propsType) => {
    return (
        <div className={classes.container}>{props.children}</div>
    )
}

export default Main
