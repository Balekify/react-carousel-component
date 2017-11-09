import React from 'react'
import shortid from 'shortid'
import option from './Settings'
import Arrow from './ReactArrow'
import Dots from './ReactDots'
import './style.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    const {
      children,
      slideToScroll = option.slideToScroll,
      initialSlide = option.initialSlide,
      slideToShow = option.slideToShow,
      transitionDuration = option.transitionDuration,
      hideDots = option.hideDots
    } = this.props

    const nbrSlides = children.length
    const carouselWidth = 100 * nbrSlides
    const slideWidth = nbrSlides * slideToShow
    const gutter = slideToShow === 1 ? 0 : (this.props.gutter || option.gutter) / 100 * slideWidth * 100 / carouselWidth

    this.state = {
      slideWidth,
      carouselWidth,
      gutter,
      slideToScroll,
      currentSlide: initialSlide,
      slideToShow,
      children,
      nbrSlides,
      transitionDuration,
      hideDots
    }

    this.handleClickPrev = this.handleClickPrev.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickDot = this.handleClickDot.bind(this)
  }

  handleClickDot (nbr) {
    this.setState(prev => {
      if (nbr + prev.slideToShow >= prev.nbrSlides) {
        nbr = prev.nbrSlides - prev.slideToShow
      }
      return { currentSlide: nbr }
    })
  }

  handleClickPrev () {
    this.setState(prev => {
      const currentSlide = prev.currentSlide - prev.slideToScroll < 0 ? 0 : prev.currentSlide - prev.slideToScroll
      return { currentSlide }
    })

    this.beforePrev()
    this.afterPrev()
    this.beforeSlide()
    this.afterSlide()
  }

  handleClickNext () {
    this.setState(prev => {
      let currentSlide = prev.currentSlide + prev.slideToScroll < prev.nbrSlides ? prev.currentSlide + prev.slideToScroll : prev.nbrSlides - 1

      if (currentSlide + prev.slideToShow >= prev.nbrSlides) {
        currentSlide = prev.nbrSlides - prev.slideToShow
      }

      return { currentSlide }
    })

    this.beforeNext()
    this.afterNext()
    this.beforeSlide()
    this.afterSlide()
  }

  beforeSlide () {
    if (typeof this.props.beforeSlide === 'function') {
      this.props.beforeSlide()
    }
  }

  afterSlide () {
    if (typeof this.props.afterSlide === 'function') {
      this.slideContainer.addEventListener('transitionend', this.props.afterSlide)
    }
  }

  beforePrev () {
    if (typeof this.props.beforePrev === 'function') {
      this.props.beforePrev()
    }
  }

  afterPrev () {
    if (typeof this.props.afterPrev === 'function') {
      this.slideContainer.addEventListener('transitionend', this.props.afterPrev)
    }
  }

  beforeNext () {
    if (typeof this.props.beforeNext === 'function') {
      this.props.beforeNext()
    }
  }

  afterNext () {
    if (typeof this.props.afterNext === 'function') {
      this.slideContainer.addEventListener('transitionend', this.props.afterNext)
    }
  }

  render () {
    const { currentSlide, slideWidth, slideToShow, carouselWidth, gutter, children, nbrSlides, transitionDuration, hideDots } = this.state

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

    const Dot = hideDots
      ? null
      : <Dots
        nbrSlides={nbrSlides}
        currentSlide={currentSlide}
        handleClickDot={this.handleClickDot}
      />

    const items = []
    children.map((item, index) => (
      items.push(<li className='Slide' style={SlideStyle} key={shortid.generate()}>{item}</li>)
    ))

    return (
      <div className='Carousel'>
        <Arrow
          handleClick={this.handleClickPrev}
          fade={!currentSlide}
        />
        <Arrow
          handleClick={this.handleClickNext}
          fade={currentSlide + slideToShow >= nbrSlides}
        />
        <div className='Slider'>
          <ul style={CarouselStyle} ref={el => { this.slideContainer = el }}>
            {items}
          </ul>
        </div>
        {Dot}
      </div>
    )
  }
}
