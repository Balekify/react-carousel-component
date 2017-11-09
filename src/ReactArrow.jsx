import React from 'react'

export default class Arrow extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.handleClick()
  }

  render () {
    const { fade } = this.props

    return (
      <button className={`Arrow ${fade ? 'Arrow--disable' : ''}`} onClick={this.handleClick} />
    )
  }
}
