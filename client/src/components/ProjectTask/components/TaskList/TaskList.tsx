import React from 'react'
import classes from "./TaskList.module.css"

import TaskItem from "../TaskItem/TaskItem"

import { taskType } from "../../ProjectTask"

type propsType = {
	tasks: taskType[]
	onEdit: (id: number) => void
	onSubmit: (data: taskType) => void
	onUpdate: (data: taskType) => void
	onDelete: (id: number) => void
}

const TaskList = ({
	tasks,
	onSubmit,
	onDelete,
	onUpdate,
	onEdit,
}: propsType) => {
	return (
		<div className={classes.container}>
			<div className={classes.header}>
				Project tasks
			</div>
			<div>
				{tasks.map((task, idx) =>
					<TaskItem
						key={Math.random()}
						task={task}
						onSubmit={onSubmit}
						onUpdate={onUpdate}
						onDelete={() => onDelete(task.id!)}
						onEdit={() => onEdit(idx)}
					/>)}
			</div>
		</div>
	)
}

export default TaskList