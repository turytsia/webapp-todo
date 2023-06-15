import React, { useEffect, useState } from 'react'
import classes from "./ProjectList.module.css"
import Button from "../Button/Button"
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/use-fetch'

const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16)

const ProjectList = () => {

    const [isLoading, get] = useFetch()
    const { pathname } = useLocation()

    const [projects, setProjects] = useState([])

    const fetchProjects = async () => {
        try {
            const { projects } = await get('/projects/')
            setProjects(projects)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <div className={classes.container}>
            {projects.map(({ id, title }) =>
                <Button
                    link
                    type={['transparent', 'bold']}
                    isActive={pathname.includes("/projects/" + id)}
                    to={'/projects/' + id}>
                    <div className={classes.color} style={{ backgroundColor: getRandomColor() }} />
                    {title}
                </Button>)}
        </div>
    )
}

export default ProjectList