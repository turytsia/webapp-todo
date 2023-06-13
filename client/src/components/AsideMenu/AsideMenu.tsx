import React from 'react'
import Menu from './components/Menu/Menu'
import Button from '../Button/Button'
import Section from './components/Section/Section'
import ProjectList from '../ProjectList/ProjectList'
import { useLocation } from 'react-router-dom'

type propsType = {
    isAuth: boolean
}

const AsideMenu = (props: propsType) => {

    const { pathname } = useLocation()

    if (!props.isAuth) {
        return (
            <Menu>
                <Section text='Home'>
                    <Button
                        link
                        to='/auth/login'
                        type={['transparent', 'bold']}
                        icon='majesticons:login-line'
                        isActive={pathname.includes("/auth")}>
                        Login
                    </Button>
                </Section>
            </Menu>
        )
    }

    return (
        <Menu>
            <Section text='Home'>
                <Button
                    link
                    to=''
                    type={['transparent', 'bold']}
                    icon='ic:round-dashboard'
                    isActive={pathname === "/"}>
                    Dashboard
                </Button>
                <Button
                    link
                    to='/projects/create'
                    type={['transparent', 'bold']}
                    icon='ic:round-plus'
                    isActive={pathname === "/projects/create"}>
                    Add new project
                </Button>
            </Section>
            <Section text='Projects'>
                <ProjectList />
            </Section>
        </Menu>
    )
}

export default AsideMenu