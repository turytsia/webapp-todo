import React from 'react'
import classes from "./Menu.module.css"
import Button from '../../../Button/Button'
import { useLocation } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

type propsType = {
    children: React.ReactNode
    isLoading: boolean
}

const Menu = ({
    children,
    isLoading
}: propsType) => {

    const { pathname } = useLocation()

    if (isLoading) {
        return <aside className={classes.containerSkeleton}>
            <Skeleton className={classes.buttonSkeleton} />
            <Skeleton className={classes.sectionSkeleton} />
            <Skeleton className={classes.buttonSkeleton} count={3} />
            <Skeleton className={classes.sectionSkeleton} />
            <div className={classes.projectSkeleton}>
                <Skeleton circle className={classes.projectDotSkeleton} />
                <Skeleton className={classes.projectTitleSkeleton} />
            </div>
            <div className={classes.projectSkeleton}>
                <Skeleton circle className={classes.projectDotSkeleton} />
                <Skeleton className={classes.projectTitleSkeleton} />
            </div>
            <div className={classes.projectSkeleton}>
                <Skeleton circle className={classes.projectDotSkeleton} />
                <Skeleton className={classes.projectTitleSkeleton} />
            </div>
        </aside>
    }

    return (
        <aside className={classes.container}>
            <Button
                link
                type={['transparent', 'bold']}
                icon="mdi:about-circle-outline"
                isActive={pathname === "/about"}>
                About
            </Button>
            {children}
        </aside>
    )
}

export default Menu