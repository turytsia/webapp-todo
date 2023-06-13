import React from 'react'

import classes from "./ProjectForm.module.css"
import Input from '../Input/Input'
import Textarea from "../Textarea/Textarea" 
import Button from '../Button/Button'

const ProjectForm = () => {
    return (
        <div className={classes.container}>
            <h2>Create new project</h2>
            <div className={classes.innerContainer}>
                <Input text="Project's title" />
                <Textarea text="Project's description" />
                <div className={classes.actions}>
                    <Button type={["color"]}>Create</Button>
                </div>
            </div>
        </div>
    )
}

export default ProjectForm