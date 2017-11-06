import React from 'react'
import option from './Settings'
import Arrow from './ReactArrow'
import './style.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    const children = this.props.children
    const nbrSlides = children.length
    const initialSlide = this.props.initialSlide || option.initialSlide
    const carouselWidth = 100 * nbrSlides
    const slideToScroll = this.props.slideToScroll || option.slideToScroll
    const slideToShow = this.props.slideToShow || option.slideToShow
    const slideWidth = nbrSlides * slideToShow
    const gutter = slideToShow === 1 ? 0 : (this.props.gutter || option.gutter) / 100 * slideWidth * 100 / carouselWidth
    const transitionDuration = this.props.transitionDuration || option.transitionDuration

    this.state = { slideWidth, carouselWidth, gutter, slideToScroll, currentSlide: initialSlide, slideToShow, children, nbrSlides, transitionDuration }

    this.handleClickPrev = this.handleClickPrev.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
  }

  handleClickPrev () {
    this.setState(prev => {
      const currentSlide = prev.currentSlide - prev.slideToScroll < 0 ? 0 : prev.currentSlide - prev.slideToScroll
      return { currentSlide }
    })

    this.onSlide()
    this.onPrev()
  }

  handleClickNext () {
    this.setState(prev => {
      let currentSlide = prev.currentSlide + prev.slideToScroll < prev.nbrSlides ? prev.currentSlide + prev.slideToScroll : prev.nbrSlides - 1

      if (currentSlide + prev.slideToShow >= prev.nbrSlides) {
        currentSlide = prev.nbrSlides - prev.slideToShow
      }

      return { currentSlide }
    })

    this.onSlide()
    this.onNext()
  }

  onSlide () {
    if (typeof this.props.onSlide === 'function') {
      this.props.onSlide.apply()
    }
  }

  onPrev () {
    if (typeof this.props.onPrev === 'function') {
      this.props.onPrev.apply()
    }
  }

  onNext () {
    if (typeof this.props.onNext === 'function') {
      this.props.onNext.apply()
    }
  }

  render () {
    const { currentSlide, slideWidth, slideToShow, carouselWidth, gutter, children, nbrSlides, transitionDuration } = this.state

    const tile = 100 / slideWidth
    const tileWidth = tile - gutter + gutter / slideToShow

    const CarouselStyle = {
      transitionDuration: `${transitionDuration}ms`,
      width: `${carouselWidth}%`,
      transform: `translateX(-${(tile + gutter / slideToShow) * currentSlide}%)`
    }

    const SlideStyle = {
      width: `${tileWidth}%`,
      marginRight: `${gutter}%`
    }

    return (
      <div className='Carousel'>
        <Arrow
          position='left'
          handleClick={this.handleClickPrev}
          fade={!currentSlide}
        />
        <div className='Slider'>
          <ul style={CarouselStyle}>
            {
              children.map((item, index) => (
                <li className='Slide' style={SlideStyle} key={index}>{item}</li>
              ))
            }
          </ul>
        </div>
        <Arrow
          position='right'
          handleClick={this.handleClickNext}
          fade={currentSlide + slideToShow >= nbrSlides}
        />
      </div>
    )
  }
}
