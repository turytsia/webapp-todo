import React from 'react'

import classes from './AuthPage.module.css'

type propsType = {
    children: React.ReactNode
    title: string
    subtitle: React.ReactNode
}

const AuthPage = (props: propsType) => {
  return (
      <section className={classes.container}>
          <div className={classes.innerContainer}>
              <div className={classes.header}>
                  <h3 className={classes.headerTitle}>{props.title}</h3>
                  <p className={classes.headerSubtitle}>{props.subtitle}</p>
              </div>
              {props.children}
          </div>
          <div className={classes.innerContainerImage} />
      </section>
  )
}

export default AuthPage