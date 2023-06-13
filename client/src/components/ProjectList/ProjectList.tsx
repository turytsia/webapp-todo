import React from 'react'
import classes from "./ProjectList.module.css"
import Button from "../Button/Button"
import { useLocation } from 'react-router-dom'

const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)

const ProjectList = () => {

    const { pathname } = useLocation()

    console.log(pathname)

    return (
        <div className={classes.container}>
            <Button
                link
                type={['transparent', 'bold']}
                isActive={pathname === "/projects/1"}
                to='/projects/1'>
                <div className={classes.color} style={{ backgroundColor: getRandomColor() }} />
                Project 1
            </Button>
        </div>
    )
}

export default ProjectList