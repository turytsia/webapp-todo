import React, { useState } from 'react'
import ProjectTaskList from "./components/ProjectTaskList/ProjectTaskList"
import classes from "./Project.module.css"
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

export type projectTaskType = {
    title: string;
    text: string;
    editable: boolean;
}

const newProjectTask: projectTaskType = {
    title: "",
    text: "",
    editable: true
}

const Project = () => {

    const navigate = useNavigate()
    const [projectTasks, setProjectTasks] = useState<projectTaskType[]>([])

    const onProjectTaskEdit = (id: number) => {
        setProjectTasks(prev => prev.map((p, i) => ({ ...p, editable: id === i })))
    }

    // const onProjectTaskReset = (id: number) => {
    //     setProjectTasks(prev => prev.filter((p,i) => i !== id))
    // }

    const onProjectTaskCancel = (id: number) => {
        setProjectTasks(prev => prev.filter((p, i) => i !== id))
    }

    const onProjectTaskCreate = () => {
        if (isProjectTaskEditable) return

        setProjectTasks(prev => {
            const lastProjectTasks = prev.map((p, i) => ({ ...p, editable: false }))
            return [...lastProjectTasks, newProjectTask]
        })
    }

    const onProjectTaskSave = (p: projectTaskType) => {
        setProjectTasks(prev => {
            const lastProjectTasks = [...prev].slice(0, -1)
            return [...lastProjectTasks, p]
        })
    }

    const onProjectTaskOpen = (id: number) => {
        if (isProjectTaskEditable) return

        navigate('project-tasks/' + id)
    }

    const isProjectTaskEditable = projectTasks.some(p => p.editable)

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.titleContainer}>
                    <h2 className={classes.title}>Project 1</h2>
                    <p className={classes.desc}>Project description</p>
                </div>
                <div className={classes.actions}>
                    <Icon
                        width={20}
                        height={20}
                        icon="ic:round-plus"
                        className={classes.iconButton}
                        onClick={onProjectTaskCreate} />
                    <Icon
                        width={20}
                        height={20}
                        icon="material-symbols:edit-outline"
                        className={classes.iconButton}
                        onClick={() => { }} />
                    <Icon
                        width={20}
                        height={20}
                        icon="material-symbols:delete-outline"
                        className={classes.iconButton}
                        onClick={() => { }} />
                </div>
            </div>
            <ProjectTaskList
                projectTasks={projectTasks}
                onSave={onProjectTaskSave}
                onOpen={onProjectTaskOpen}
                onCancel={onProjectTaskCancel} />
        </div>
    )
}

export default Project