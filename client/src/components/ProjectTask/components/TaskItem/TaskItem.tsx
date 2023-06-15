import React, { MouseEventHandler, useState } from 'react'
import EditableText from "../../../EditableText/EditableText"

import classes from "./TaskItem.module.css"
import { Icon } from '@iconify/react'

type propsType = {
    editable: boolean
    text: string
    isDone: boolean
    onSave: () => void
    onEdit: () => void
} 

const TaskItem = ({
    editable,
    isDone,
    text: initialText,
    onSave,
    onEdit
}: propsType) => {

    const [text, setText] = useState(initialText)

    const onEditHandler = (e: any) => {
        e.preventDefault()
        onEdit()
    }

    return (
        <div className={classes.container}>
            <div className={classes.titleContainer}>
                <input type="checkbox" />
                <EditableText
                    placeholder="Task's text"
                    className={classes.title}
                    value={text}
                    readOnly={!editable}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <div className={classes.actions}>
                {editable ?
                    <>
                        <Icon
                            width={20}
                            height={20}
                            icon="ic:round-check"
                            className={classes.iconButton}
                            onClick={onSave} />
                        <Icon
                            width={20}
                            height={20}
                            icon="charm:cross"
                            className={classes.iconButton}
                            onClick={() => {}} />
                    </> :
                    <>
                        <Icon
                            width={20}
                            height={20}
                            icon="material-symbols:edit-outline"
                            className={classes.iconButton}
                            onClick={onEditHandler} />
                        <Icon
                            width={20}
                            height={20}
                            icon="material-symbols:delete-outline"
                            className={classes.iconButton}
                            onClick={() => { }} />
                    </>}
            </div>
        </div>
    )
}

export default TaskItem