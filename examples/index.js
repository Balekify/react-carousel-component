import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactCarousel from '../src/ReactCarousel'
import './index.css'

class DemoCarousel extends Component {
  render () {
    const items = []

    for (let i = 0; i < 10; i++) {
      items.push(<div key={i} className='Item'>{i}</div>)
    }

    const settings = {
      slideToShow: 3,
      gutter: 10,
      afterPrev: _ => console.log('after prev'),
      beforeNext: _ => console.log('before next')
    }

    return (
      <ReactCarousel {...settings}>
        {items}
      </ReactCarousel>
    )
  }
}

render(
  <DemoCarousel />,
  document.getElementById('app')
)
