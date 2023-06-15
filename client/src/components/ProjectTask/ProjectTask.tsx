import React, { useState } from 'react'
import classes from "./ProjectTask.module.css"
import EditableText from '../EditableText/EditableText'
import TaskList from "./components/TaskList/TaskList"
import { Icon } from '@iconify/react'

export type taskType = {
    isDone: boolean
    text: string
    editable: boolean
}

const emptyTask: taskType = {
    isDone: false,
    text: "",
    editable: true
}

const ProjectTask = () => {
    
    const [title, setTitle] = useState("Title")
    const [text, setText] = useState("Text")
    const [tasks, setTasks] = useState<taskType[]>([])

    const onCreateTask = () => {
        if (isEditable) return
        
        setTasks(prev => {
            const newTasks = prev.map(p => ({ ...p, editable: false }))
            return [...newTasks, emptyTask]
        })
    }

    const onSaveTask = (id: number) => {
        setTasks(prev => prev.map((t, i) => ({ ...t, editable: id !== i })))
    }

    const onEditTask = (id: number) => {
        setTasks(prev => prev.map((t, i) => ({ ...t, editable: id === i })))
    }

    const isEditable = tasks.some(({isDone}) => isDone)

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.titleContainer}>
                    <EditableText
                        placeholder="Project task's title"
                        className={classes.title}
                        value={title}
                        readOnly={!isEditable}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <EditableText
                        placeholder="Project task's description"
                        className={classes.desc}
                        value={text}
                        readOnly={!isEditable}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                <div className={classes.actions}>
                    <Icon
                        width={20}
                        height={20}
                        icon="ic:round-plus"
                        className={classes.iconButton}
                        onClick={onCreateTask} />
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
            <TaskList
                tasks={tasks}
                onSave={onSaveTask}
                onEdit={onEditTask}
            />
        </div>
    )
}

export default ProjectTask