import React, { useState } from 'react'

import classes from "./ProjectForm.module.css"
import Input from '../Input/Input'
import Textarea from "../Textarea/Textarea" 
import Button from '../Button/Button'
import { getRandomColor } from '../../utils'

export type projectFormType = {
    title: string
    text: string
    color: string
}

type propsType = {
    onCreate: (project: projectFormType) => void
}

const initialProject: projectFormType = {
    title: '',
    text: '',
    color: ''
}

const ProjectForm = ({
    onCreate: onCreateHandler
}: propsType) => {

    const [project, setProject] = useState<projectFormType>(initialProject)

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProject(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const onCreate = () => {
        onCreateHandler({ ...project, color: getRandomColor()})
    }

    return (
        <div className={classes.container}>
            <h2>Create new project</h2>
            <div className={classes.innerContainer}>
                <Input onChange={onChange} name='title' text="Project's title" />
                <Textarea onChange={onChange} name='text' text="Project's description" />
                <div className={classes.actions}>
                    <Button type={["color"]} onClick={onCreate}>Create</Button>
                </div>
            </div>
        </div>
    )
}

export default ProjectForm