import React, { MouseEventHandler, useState } from 'react'

import { Icon } from '@iconify/react'
import EditableText from '../../../EditableText/EditableText'

import { projectTaskType } from '../../Project'

import classNames from 'classnames'
import classes from "./ProjectTaskItem.module.css"
import { withStopPropagation } from '../../../../utils'

type propsType = {
    projectTask: projectTaskType
    onClick: () => void
    onDelete: (id: number) => void
    onEdit: (id: number) => void
    onSubmit: (data: projectTaskType) => void
    onUpdate: (data: projectTaskType) => void
}

const ProjectTaskItem = ({
    projectTask: initialProjectTask,
    onClick,
    onEdit,
    onSubmit,
    onUpdate,
    onDelete
}: propsType) => {

    const [title, setTitle] = useState(initialProjectTask.title)
    const [text, setText] = useState(initialProjectTask.text)

    const projectTask = { ...initialProjectTask, title, text }
    
    const containerStyles = classNames(classes.container, { [classes.editable]: projectTask.isEditable })

    return (
        <div className={containerStyles} onClick={onClick}>
            <div className={classes.titleContainer}>
                <EditableText
                    placeholder="Project task's title"
                    className={classes.title}
                    value={title}
                    readOnly={!projectTask.isEditable}
                    onChange={e => setTitle(e.target.value)}
                />
                <EditableText
                    placeholder="Project task's description"
                    className={classes.desc}
                    value={text}
                    readOnly={!projectTask.isEditable}
                    onChange={e => setText(e.target.value)}
                />
            </div>
            <div className={classes.actions}>
                {projectTask.isEditable ?
                    <>
                        <Icon
                            width={20}
                            height={20}
                            icon="ic:round-check"
                            className={classes.iconButton}
                            onClick={() => projectTask.isSaved ? onUpdate({ ...projectTask, isEditable: false }) : onSubmit({ ...projectTask, isEditable: false })} />
                        <Icon
                            width={20}
                            height={20}
                            icon="material-symbols:delete-outline"
                            className={classes.iconButton}
                            onClick={withStopPropagation(onDelete)} />
                    </> :
                    <Icon
                        width={20}
                        height={20}
                        icon="material-symbols:edit-outline"
                        className={classes.iconButton}
                        onClick={withStopPropagation(onEdit)} />}
            </div>
        </div>
    )
}

export default ProjectTaskItem