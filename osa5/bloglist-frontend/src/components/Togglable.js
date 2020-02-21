import React, { useState } from 'react'

const Togglable = (props) => {
  const [ visible, setVisible ] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  return (
    <div>
      <h3>Togglable</h3>
      <div style={hideWhenVisible} >
        {props.children}
        <button onClick={toggleVisible} >cancel</button>
      </div>
      <div style={showWhenVisible} >
        <button onClick={toggleVisible} >{props.buttonLabel}</button>
      </div>
    </div>
  )
}

export default Togglable
