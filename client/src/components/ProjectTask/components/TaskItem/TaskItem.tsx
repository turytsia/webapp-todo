import React, { MouseEventHandler, useState } from 'react'
import EditableText from "../../../EditableText/EditableText"

import classes from "./TaskItem.module.css"
import { Icon } from '@iconify/react'
import { taskType } from '../../ProjectTask'
import { withStopPropagation } from '../../../../utils'

type propsType = {
    task: taskType
    onSubmit: (data: taskType) => void
    onUpdate: (data: taskType) => void
    onDelete: () => void
    onEdit: () => void
} 

const TaskItem = ({
    task: initialTask,
    onSubmit,
    onUpdate,
    onDelete,
    onEdit
}: propsType) => {

    const [task, setTask] = useState(initialTask)

    const onTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(t => ({...t, [e.target.name]: e.target.value}))
    }

    return (
        <div className={classes.container}>
            <div className={classes.titleContainer}>
                <input type="checkbox" />
                <EditableText
                    placeholder="Task's text"
                    className={classes.title}
                    value={task.text}
                    readOnly={!task.isEditable}
                    name='text'
                    onChange={onTaskChange}
                />
            </div>
            <div className={classes.actions}>
                {task.isEditable ?
                    <>
                        <Icon
                            width={20}
                            height={20}
                            icon="ic:round-check"
                            className={classes.iconButton}
                            onClick={() => task.isSaved ? onUpdate({ ...task, isEditable: false }) : onSubmit({ ...task, isEditable: false })} />
                        <Icon
                            width={20}
                            height={20}
                            icon="material-symbols:delete-outline"
                            className={classes.iconButton}
                            onClick={onDelete} />
                    </> :
                    <>
                        <Icon
                            width={20}
                            height={20}
                            icon="material-symbols:edit-outline"
                            className={classes.iconButton}
                            onClick={withStopPropagation(onEdit)} />
                    </>}
            </div>
        </div>
    )
}

export default TaskItem