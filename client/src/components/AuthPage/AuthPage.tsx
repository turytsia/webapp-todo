import React from 'react'
import Message from "../Message/Message"

import classes from './AuthPage.module.css'

type propsType = {
    children: React.ReactNode
    title: string
    subtitle: React.ReactNode
    message?: string 
    setMessage?: (message: string) => void
}

const AuthPage = ({
    children,
    title,
    subtitle,
    message = "",
    setMessage = (message) => {}
}: propsType) => {
  return (
      <section className={classes.container}>
          <Message text={message} setText={setMessage} type='ERROR' />
          <div className={classes.innerContainer}>
              <div className={classes.header}>
                  <h3 className={classes.headerTitle}>{title}</h3>
                  <p className={classes.headerSubtitle}>{subtitle}</p>
              </div>
              {children}
          </div>
          <div className={classes.innerContainerImage} />
      </section>
  )
}

export default AuthPage