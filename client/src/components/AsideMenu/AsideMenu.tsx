import React from 'react'
import Menu from './components/Menu/Menu'
import Button from '../Button/Button'
import Section from './components/Section/Section'
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
                    to=''
                    type={['transparent', 'bold']}
                    icon='ic:round-plus'
                    isActive={pathname === "/projects/create-new-project"}>
                    Add new project
                </Button>
            </Section>
            <Section text='Projects'>
                {/* <Button
                    link
                    to=''
                    type={['transparent', 'bold']}
                    icon='material-symbols:dashboard'
                    isActive={pathname === ""}>
                    Dashboard
                </Button> */}
            </Section>
        </Menu>
    )
}

export default AsideMenu