import React from 'react'
import Skeleton from 'react-loading-skeleton'

import classes from "./Project.module.css"

const ProjectSkeleton = () => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Skeleton width={200} height={24} />
          <Skeleton className={classes.textSkeleton} width={400} />
          <Skeleton width={300} />
        </div>
        <div className={classes.actions}>
          <Skeleton circle width={30} height={30} />
          <Skeleton circle width={30} height={30} />
          <Skeleton circle width={30} height={30} />
        </div>
      </div>
      {/* <ProjectTaskList
                    projectTasks={projectTasks}
                    onSave={onProjectTaskSave}
                    onOpen={onProjectTaskOpen}
                    onCancel={onProjectTaskCancel} /> */}
    </div>
  )
}

export default ProjectSkeleton