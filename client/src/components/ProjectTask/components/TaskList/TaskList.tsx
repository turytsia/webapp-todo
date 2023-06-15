import React from 'react'
import classes from "./TaskList.module.css"

import TaskItem from "../TaskItem/TaskItem"

import { taskType } from "../../ProjectTask"

type propsType = {
	tasks: taskType[]
	onSave: (id: number) => void
	onEdit: (id: number) => void
}

const TaskList = ({
	tasks,
	onSave,
	onEdit,
}: propsType) => {
	return (
		<div className={classes.container}>
			<div className={classes.header}>
				Project tasks
			</div>
			{tasks.map(({ isDone, text, editable }, id) =>
				<TaskItem
					key = {id}
					editable={editable}
					isDone={isDone}
					text={text}
					onSave={() => onSave(id)}
					onEdit={() => onEdit(id)}
					 />)}
		</div>
	)
}

export default TaskList