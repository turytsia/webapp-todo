import React, { useEffect, useState } from 'react'
import classes from "./ProjectTask.module.css"
import EditableText from '../EditableText/EditableText'
import TaskList from "./components/TaskList/TaskList"
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import { projectTaskType } from '../Project/Project'

export type taskType = {
    id?: number
    isDone: boolean
    text: string
    isEditable: boolean
    isSaved: boolean
}

type propsType = {
    onFetch: (projectID: string | undefined, projectTaskID: string | undefined) => Promise<projectTaskType>
    onUpdate: (projectID: number, projectTaskID: number, data: projectTaskType) => Promise<projectTaskType>
    onDelete: (projectID: number, projectTaskID: number) => void
    onCreateTask: (projectID: number, projectTaskID: number, data: taskType) => Promise<taskType>
    onUpdateTask: (projectID: number, projectTaskID: number, taskID: number, data: taskType) => Promise<taskType>
    onDeleteTask: (projectID: number, projectTaskID: number, taskID: number) => void
}

const initialProjectTask: projectTaskType = {
    title: "",
    text: "",
    isEditable: true,
    isSaved: false,
    tasks: []
}

const initialTask: taskType = {
    text: "",
    isDone: false,
    isEditable: true,
    isSaved: false
}

const ProjectTask = ({
    onFetch,
    onUpdate,
    onDelete,
    onCreateTask,
    onUpdateTask,
    onDeleteTask
}: propsType) => {

    const navigate = useNavigate()
    const { projectID, projectTaskID } = useParams()

    const [isEditable, setIsEditable] = useState(false)
    const [projectTask, setProjectTask] = useState<projectTaskType>(initialProjectTask)
    const [tasks, setTasks] = useState<taskType[]>([])

    const onTaskCreate = () => {
        if (hasEditableTasks) return
        setTasks(prev => [...prev.map(p => ({ ...p, isEditable: false })), initialTask])
    }

    const onTaskSubmit = async (data: taskType) => {
        const task = await onCreateTask(projectTask.project_id!, projectTask.id!, data)
        setTasks(prev => [...prev.slice(0, -1), { ...task, isSaved: true }])
    }

    const onTaskUpdate = async (data: taskType) => {
        const task = await onUpdateTask(projectTask.project_id!, projectTask.id!, data.id!, data)
        setTasks(prev => prev.map(t => ({ ...(task.id === t.id ? task : t), isEditable: false, isSaved: true })))
    }

    const onTaskDelete = (id: number) => {
        onDeleteTask(projectTask.project_id!, projectTask.id!, id)
        setTasks(prev => prev.filter(({ id: i }) => id !== i))
    }

    const onEditTask = (id: number) => {
        setTasks(prev => prev.map((t, i) => ({ ...t, isEditable: id === i })))
    }

    const onProjectUpdate = () => {
        onUpdate(projectTask.project_id!, projectTask.id!, projectTask)
        setIsEditable(false)
    }

    const onProjectDelete = () => {
        onDelete(projectTask.project_id!, projectTask.id!)
        navigate("/projects/" + projectID)
    }

    const onProjectTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectTask(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const fetchData = async () => {
        const projectTask = await onFetch(projectID, projectTaskID)
        setTasks(projectTask.tasks.map(t => ({ ...t, isSaved: true })))
        setProjectTask(projectTask)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const hasEditableTasks = tasks.some(({ isEditable }) => isEditable)

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.titleContainer}>
                    <EditableText
                        placeholder="Project task's title"
                        className={classes.title}
                        value={projectTask.title}
                        readOnly={!isEditable}
                        name="title"
                        onChange={onProjectTaskChange}
                    />
                    <EditableText
                        placeholder="Project task's description"
                        className={classes.desc}
                        value={projectTask.text}
                        readOnly={!isEditable}
                        name="text"
                        onChange={onProjectTaskChange}
                    />
                </div>
                <div className={classes.actions}>
                    {isEditable ?
                        <>
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
                        </> :
                        <>
                            <Icon
                                width={20}
                                height={20}
                                icon="ic:round-plus"
                                className={classes.iconButton}
                                onClick={onTaskCreate} />
                            <Icon
                                width={20}
                                height={20}
                                icon="material-symbols:edit-outline"
                                className={classes.iconButton}
                                onClick={() => setIsEditable(true)} />
                        </>}

                </div>
            </div>
            <TaskList
                tasks={tasks}
                onSubmit={onTaskSubmit}
                onUpdate={onTaskUpdate}
                onDelete={onTaskDelete}
                onEdit={onEditTask}
            />
        </div>
    )
}

export default ProjectTask