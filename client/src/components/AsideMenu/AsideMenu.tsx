import React, { useContext, useEffect } from 'react'
import Menu from './components/Menu/Menu'
import Button from '../Button/Button'
import Section from './components/Section/Section'
import ProjectList, { projectType } from '../ProjectList/ProjectList'
import { useLocation } from 'react-router-dom'

import classes from "./AsideMenu.module.css"
import { AuthContext } from '../../context/AuthProvider'

type propsType = {
    isAuth: boolean
    isLoading: boolean
    projects: projectType[]
}

const AsideMenu = ({
    isAuth,
    isLoading,
    projects,
}: propsType) => {

    const { pathname } = useLocation()
    const { onLogout } = useContext(AuthContext)

    if (!isAuth) {
        return (
            <Menu isLoading={false}>
                <Section text='Home'>
                    <Button
                        link
                        to='/auth/login'
                        type={['transparent']}
                        icon='majesticons:login-line'
                        isActive={pathname.includes("/auth")}>
                        Login
                    </Button>
                </Section>
            </Menu>
        )
    }

    return (
        <Menu isLoading={isLoading}>
            <Section text='Home'>
                <Button
                    link
                    to=''
                    type={['transparent']}
                    icon='ic:round-dashboard'
                    isActive={pathname === "/"}>
                    Dashboard
                </Button>
                <Button
                    link
                    to='/projects/create'
                    type={['transparent']}
                    icon='ic:round-plus'
                    isActive={pathname === "/projects/create"}>
                    Add new project
                </Button>
            </Section>
            <Section className={classes.projectList} text='Projects'>
                <ProjectList projects={projects} />
            </Section>
            <Button
                onClick={onLogout}
                type={['transparent']}
                icon='material-symbols:logout'>
                Sign Out
            </Button>
        </Menu>
    )
}

export default AsideMenu