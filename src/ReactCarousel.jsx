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
      autoScroll = option.autoScroll,
      timer = option.timer,
      initialSlide = option.initialSlide,
      slideToShow = option.slideToShow,
      slideToScroll = option.slideToScroll,
      speed = option.speed,
      hideDots = option.hideDots
    } = this.props

    this.state = {
      children,
      autoScroll,
      timer,
      currentSlide: initialSlide,
      slideToShow,
      slideToScroll,
      gutter: null,
      speed,
      hideDots,
      wait: false,
      nbrSlides: null,
      carouselWidth: null,
      slideWidth: null
    }

    this.handleClickPrev = this.handleClickPrev.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
    this.handleClickDot = this.handleClickDot.bind(this)
  }

  componentWillMount () {
    const { children, slideToShow } = this.state

    const nbrSlides = children.length
    const carouselWidth = 100 * nbrSlides
    const slideWidth = nbrSlides * slideToShow
    const gutter = slideToShow === 1 ? 0 : (this.props.gutter || option.gutter) / 100 * slideWidth * 100 / carouselWidth

    this.setState({
      gutter,
      nbrSlides,
      carouselWidth,
      slideWidth
    })
  }

  componentDidMount () {
    const { autoScroll, timer } = this.state

    if (autoScroll) {
      setInterval(this.handleClickNext, timer)
    }
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
    if (!this.state.wait) {
      this.setState(prev => {
        const currentSlide = prev.currentSlide - prev.slideToScroll < 0 ? 0 : prev.currentSlide - prev.slideToScroll

        return { currentSlide }
      })

      this.prev()
    }
  }

  handleClickNext () {
    if (!this.state.wait) {
      this.setState(prev => {
        let currentSlide = prev.currentSlide + prev.slideToScroll < prev.nbrSlides ? prev.currentSlide + prev.slideToScroll : prev.nbrSlides - 1

        if (currentSlide + prev.slideToShow >= prev.nbrSlides) {
          currentSlide = prev.nbrSlides - prev.slideToShow
        }

        return { currentSlide }
      })

      this.next()
    }
  }

  transition (before, after) {
    this.setState({ wait: true })

    const { beforeSlide, afterSlide } = this.props

    const func = _ => {
      this.setState({ wait: false })

      if (typeof after === 'function') {
        after()
      }

      if (typeof afterSlide === 'function') {
        afterSlide()
      }

      this.slideContainer.removeEventListener('transitionend', func, false)
    }

    if (typeof beforeSlide === 'function') {
      beforeSlide()
    }

    if (typeof before === 'function') {
      before()
    }

    this.slideContainer.addEventListener('transitionend', func, false)
  }

  prev () {
    const { beforePrev, afterPrev } = this.props

    this.transition(beforePrev, afterPrev)
  }

  next () {
    const { beforeNext, afterNext } = this.props

    this.transition(beforeNext, afterNext)
  }

  render () {
    const { currentSlide, slideWidth, slideToShow, carouselWidth, gutter, children, nbrSlides, speed, hideDots } = this.state

    const tile = 100 / slideWidth
    const tileWidth = tile - gutter + gutter / slideToShow

    const CarouselStyle = {
      transitionDuration: `${speed}ms`,
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
    children.map(item => (
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
