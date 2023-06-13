import React from 'react'
import ProjectTaskItem from "../ProjectTaskItem/ProjectTaskItem"

import classes from "./ProjectTaskList.module.css"

import { projectTaskType } from '../../Project'

type propsType = {
    projectTasks: projectTaskType[]
    onSave: (p: projectTaskType) => void
    onOpen: (id: number) => void
    onCancel: (id: number) => void
}

const ProjectTaskList = ({
    projectTasks,
    onSave,
    onOpen,
    onCancel
}: propsType) => {
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                Project tasks
            </div>
            <div>
                {projectTasks.map(({ editable, title, text }, id) =>
                    <ProjectTaskItem
                        editable={editable}
                        title={title}
                        text={text}
                        onSave={onSave}
                        onClick={() => onOpen(id)}
                        onCancel={() => onCancel(id)} />)}
            </div>
        </div>
    )
}

export default ProjectTaskList