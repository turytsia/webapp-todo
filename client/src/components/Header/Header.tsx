import React from 'react'
import classes from "./Header.module.css"

const Header = () => {
  return (
      <header className={classes.container}>
          <h2 className={classes.title}>&lt;MyTodo /&gt;</h2>
      </header>
  )
}

export default Header