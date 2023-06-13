import { Icon } from '@iconify/react'
import React, { useState } from 'react'

import classes from "./ProjectTaskItem.module.css"
import EditableText from '../../../EditableText/EditableText'
import classNames from 'classnames'

import { projectTaskType } from '../../Project'

type propsType = {
    editable: boolean
    title: string
    text: string
    onSave: (e: projectTaskType) => void
    onClick: () => void
    onCancel: () => void
}

const ProjectTaskItem = ({
    editable,
    title: initialTitle,
    text: initialText,
    onSave,
    onClick,
    onCancel
}: propsType) => {

    const [title, setTitle] = useState(initialTitle)
    const [text, setText] = useState(initialText)

    const containerStyles = classNames(classes.container, { [classes.editable]: editable })

    return (
        <div className={containerStyles} onClick={onClick}>
            <div className={classes.titleContainer}>
                <EditableText
                    placeholder="Project task's title"
                    className={classes.title}
                    value={title}
                    readOnly={!editable}
                    onChange={e => setTitle(e.target.value)}
                />
                <EditableText
                    placeholder="Project task's description"
                    className={classes.desc}
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
                            onClick={() => onSave({ title, text, editable:false })} />
                        <Icon
                            width={20}
                            height={20}
                            icon="charm:cross"
                            className={classes.iconButton}
                            onClick={onCancel} />
                    </> :
                    <>
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
                    </>}
            </div>
        </div>
    )
}

export default ProjectTaskItem