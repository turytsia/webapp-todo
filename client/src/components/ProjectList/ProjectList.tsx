import React, { useEffect, useState } from 'react'
import classes from "./ProjectList.module.css"
import Button from "../Button/Button"
import { useLocation } from 'react-router-dom'

export type projectType = {
    id: number
    title: string
    text: string
    color?: string
}

type propsType = {
    projects: projectType[]
}

const ProjectList = ({
    projects,
}: propsType) => {

    const { pathname } = useLocation()

    return (
        <div className={classes.container}>
            {projects.map(({ id, color, title }) =>
                <Button
                    link
                    key={id}
                    type={['transparent']}
                    isActive={pathname.includes("/projects/" + id)}
                    to={'/projects/' + id}>
                    <div className={classes.color} style={{ backgroundColor: color}} />
                    {title}
                </Button>)}
        </div>
    )
}

export default ProjectList