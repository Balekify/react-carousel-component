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

    this.state = { slideWidth, carouselWidth, gutter, slideToScroll, currentSlide: initialSlide, slideToShow, children, nbrSlides }

    this.handleClickPrev = this.handleClickPrev.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
  }

  handleClickPrev () {
    this.setState(prev => {
      const currentSlide = prev.currentSlide - prev.slideToScroll < 0 ? 0 : prev.currentSlide - prev.slideToScroll
      return { currentSlide }
    })
  }

  handleClickNext () {
    this.setState(prev => {
      let currentSlide = prev.currentSlide + prev.slideToScroll < prev.nbrSlides ? prev.currentSlide + prev.slideToScroll : prev.nbrSlides - 1

      if (currentSlide + prev.slideToShow >= prev.nbrSlides) {
        currentSlide = prev.nbrSlides - prev.slideToShow
      }

      return { currentSlide }
    })
  }

  render () {
    const { currentSlide, slideWidth, slideToShow, carouselWidth, gutter, children, nbrSlides } = this.state

    const tile = 100 / slideWidth
    const tileWidth = tile - gutter + gutter / slideToShow

    const CarouselStyle = {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      transition: 'transform .3s ease-in-out',
      width: `${carouselWidth}%`,
      transform: `translateX(-${(tile + gutter / slideToShow) * currentSlide}%)`
    }

    const SlideStyle = {
      float: 'left',
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
