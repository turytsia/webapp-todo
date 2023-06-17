import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { Icon } from '@iconify/react'
import ProjectTaskList from "./components/ProjectTaskList/ProjectTaskList"
import ProjectSkeleton from "./ProjectSkeleton"

import { projectFormType } from '../ProjectForm/ProjectForm'
import { taskType } from '../ProjectTask/ProjectTask'

import classes from "./Project.module.css"
import EditableText from '../EditableText/EditableText'

export type projectTaskType = {
    id?: number
    project_id?: number
    title: string
    text: string
    isEditable: boolean
    isSaved?: boolean
    tasks: taskType[]
}

export type projectType = {
    id: number
    title: string
    text: string
    created_at: string
    updated_at: string
    project_tasks: projectTaskType[]
    color: string
}

type propsType = {
    isLoading: boolean
    onFetch: (id: string | undefined) => Promise<projectType>
    onDelete: (id: number) => void
    onUpdate: (id: number, data: projectFormType) => void
    onCreateTask: (id: number, data: projectTaskType) => Promise<projectTaskType>
    onUpdateTask: (id: number, projectTaskID: number, data: projectTaskType) => Promise<projectTaskType>
    onDeleteTask: (id: number, projectTaskID: number) => void
}

const initialProjectTask: projectTaskType = {
    title: "",
    text: "",
    isEditable: true,
    isSaved: false,
    tasks: []
}

const initialProject: projectType = {
    id: 0,
    title: "",
    text: "",
    created_at: "",
    updated_at: "",
    project_tasks: [],
    color: ""
}

/**
 * Creates project page
 * 
 * @param props 
 */
const Project = ({
    isLoading,
    onDelete,
    onFetch,
    onUpdate,
    onCreateTask,
    onUpdateTask,
    onDeleteTask
}: propsType) => {

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { projectID } = useParams()

    const [isEditable, setIsEditable] = useState(false)
    const [project, setProject] = useState<projectType>(initialProject)
    const [projectTasks, setProjectTasks] = useState<projectTaskType[]>([])

    //handlers

    /**
     * Enables edit mode for specific project task
     * 
     * @param idx index of project task
     */
    const onProjectTaskEdit = (idx: number) => {
        setProjectTasks(prev => prev.map((p, i) => ({ ...p, isEditable: idx === i })))
    }

    /**
     * Removes project task by its index, sends request delete
     * 
     * @param idx index of project task
     */
    const onProjectTaskDelete = async (idx: number) => {
        onDeleteTask(project.id, projectTasks[idx].id!)
        setProjectTasks(prev => prev.filter((_, i) => i !== idx))
    }

    /**
     * Creates empty project task in edit mode, switching off editing at others
     */
    const onProjectTaskCreate = () => {
        if (hasEditableProjectTask) return   //Creating in edit mode is not allowed
        setProjectTasks(prev => [...prev.map(p => ({ ...p, isEditable: false })), initialProjectTask])
    }

    /**
     * Submits new project task, stores it in DB
     * 
     * @param data newly created project task
     */
    const onProjectTaskSubmit = async (data: projectTaskType) => {
        const projectTask = await onCreateTask(project.id, data)
        setProjectTasks(prev => [...prev.slice(0, -1), { ...projectTask, isSaved: true }])
    }

    /**
     * Updates project task
     * 
     * @param data updated project task
     */
    const onProjectTaskUpdate = async (data: projectTaskType) => {
        const projectTask = await onUpdateTask(project.id, data.id!, data)
        setProjectTasks(prev => prev.map(p => ({ ...(p.id === projectTask.id ? projectTask : p), isEditable: false, isSaved: true })))
    }

    /**
     * Redirects user to a project task
     * 
     * @param id project task's id
     */
    const onProjectTaskOpen = (id: number) => {
        if (hasEditableProjectTask) return // you cannot redirect when editting project task
        navigate('project-tasks/' + id)
    }

    /**
     * Removes current project and redirects user to a Dashboard
     */
    const onProjectDelete = () => {
        onDelete(project.id)
        navigate("/")
    }

    const onProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onProjectUpdate = () => {
        onUpdate(project.id, project)
        setIsEditable(false)
    }

    /**
     * Data fetch
     */
    const fetchData = async () => {
        const project = await onFetch(projectID)
        setProject(project)
        setProjectTasks(project.project_tasks.map(task => ({ ...task, isSaved: true })))
    }

    useEffect(() => {
        fetchData()
    }, [pathname])

    const hasEditableProjectTask = useMemo(() => projectTasks.some(({ isEditable }) => isEditable), [projectTasks])

    if (isLoading) {
        return <ProjectSkeleton />
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.titleContainer}>
                    <EditableText
                        placeholder="Project task's title"
                        className={classes.title}
                        value={project.title}
                        readOnly={!isEditable}
                        name="title"
                        onChange={onProjectChange}
                    />
                    <EditableText
                        placeholder="Project task's title"
                        className={classes.desc}
                        value={project.text}
                        readOnly={!isEditable}
                        name="text"
                        onChange={onProjectChange}
                    />
                </div>
                <div className={classes.actions}>
                    {isEditable ? <>
                        <Icon
                            width={20}
                            height={20}
                            icon="ic:round-check"
                            className={classes.iconButton}
                            onClick={onProjectUpdate} />
                        <Icon
                            width={20}
                            height={20}
                            icon="material-symbols:delete-outline"
                            className={classes.iconButton}
                            onClick={onProjectDelete} />
                    </>
                        :
                        <>
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
                                onClick={() => setIsEditable(true)} />
                        </>}


                </div>
            </div>
            <ProjectTaskList
                projectTasks={projectTasks}
                onSubmit={onProjectTaskSubmit}
                onUpdate={onProjectTaskUpdate}
                onOpen={onProjectTaskOpen}
                onEdit={onProjectTaskEdit}
                onDelete={onProjectTaskDelete}
            />
        </div>
    )
}

export default Project