import React, { useState } from 'react'

import classes from "./ProjectForm.module.css"
import Input from '../Input/Input'
import Textarea from "../Textarea/Textarea" 
import Button from '../Button/Button'
import useFetch from '../../hooks/use-fetch'

const initialProject = {
    title: '',
    text: ''
}

const ProjectForm = () => {

    const [isLoading, get, post] = useFetch()

    const [project, setProject] = useState(initialProject)

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProject(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const onProjectCreate = async () => {
        try {
            const data = await post('/projects/', project)
            setProject(initialProject)
        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <div className={classes.container}>
            <h2>Create new project</h2>
            <div className={classes.innerContainer}>
                <Input onChange={onChange} name='title' text="Project's title" />
                <Textarea onChange={onChange} name='text' text="Project's description" />
                <div className={classes.actions}>
                    <Button type={["color"]} onClick={onProjectCreate}>Create</Button>
                </div>
            </div>
        </div>
    )
}

export default ProjectForm