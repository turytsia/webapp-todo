import React, { useMemo, useState } from 'react'
import classes from "./ProjectTask.module.css"
import EditableText from '../EditableText/EditableText'
import { useLocation } from 'react-router-dom'

const QUERY_EDITABLE = 'editable'

const ProjectTask = () => {

    const { search } = useLocation()
    const query = useMemo(() => new URLSearchParams(search), [search])

    const [isEditable, setIsEditable] = useState(query.get(QUERY_EDITABLE))

    return (
        <div className={classes.container}>
            <div>
                <EditableText
                    value='Hello'
                    readOnly={!isEditable} />
            </div>

        </div>
    )
}

export default ProjectTask