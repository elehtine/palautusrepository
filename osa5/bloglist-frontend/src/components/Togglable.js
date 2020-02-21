import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [ visible, setVisible ] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  return (
    <div>
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

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
