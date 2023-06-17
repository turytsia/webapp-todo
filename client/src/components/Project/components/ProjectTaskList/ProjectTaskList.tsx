import React from 'react'
import ProjectTaskItem from "../ProjectTaskItem/ProjectTaskItem"

import classes from "./ProjectTaskList.module.css"

import { projectTaskType } from '../../Project'

type propsType = {
    projectTasks: projectTaskType[]
    onOpen: (id: number) => void
    onEdit: (id: number) => void
    onDelete: (id: number) => void
    onSubmit: (p: projectTaskType) => void
    onUpdate: (p: projectTaskType) => void
}

/**
 * Creates project task list at Project.tsx
 * 
 * @param props 
 */
const ProjectTaskList = ({
    projectTasks,
    onSubmit,
    onOpen,
    onEdit,
    onDelete,
    onUpdate,
}: propsType) => {
    return (
        <div className={classes.container}>
            <div className={classes.header}>
                Project tasks
            </div>
            <div>
                {projectTasks.map((projectTask, idx) =>
                    <ProjectTaskItem
                        key={Math.random()}
                        projectTask={projectTask}
                        onClick={() => onOpen(projectTask.id!)}
                        onEdit={() => onEdit(idx)}
                        onSubmit={onSubmit}
                        onUpdate={onUpdate}
                        onDelete={() => onDelete(idx)} />
                )}
            </div>
        </div>
    )
}

export default ProjectTaskList