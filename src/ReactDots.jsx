import React from 'react'

export default class Dots extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (nbr) {
    this.props.handleClickDot(nbr)
  }

  render () {
    const { nbrSlides, currentSlide } = this.props
    const items = []

    for (let i = 0; i < nbrSlides; i++) {
      items.push(
        <li className={'Dot' + (i === currentSlide ? ' current' : '')} onClick={_ => this.handleClick(i)} key={i}>&nbsp;</li>
      )
    }

    return (
      <ul className='Dots'>
        {items}
      </ul>
    )
  }
}
