import React from 'react'

import classes from "./Container.module.css"

type propsType = {
    children: React.ReactNode
}

const Container = (props: propsType) => {
    return (
        <section className={classes.container}>{props.children}</section>
    )
}

export default Container