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
    const { position, fade } = this.props

    return (
      <button className={`Arrow Arrow--${position} ${fade ? 'Arrow--disable' : ''}`} onClick={this.handleClick} />
    )
  }
}
