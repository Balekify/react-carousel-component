# React-carousel-component

> Carousel component for react

## Usage
```js
class Exemple extends React.Component {
  render () {
    const items = [1, 2, 3, 4, 5]

    const settings = {
      currentSlide: 3,
      onNext: _ => console.log('Next arrow clicked')
    }

    return (
      <ReactCarousel {...settings}>
        {items}
      </ReactCarousel>
    )
  }
}
```

## Options
| Name | Type | Default | Description|
|------|------|---------|------------|
| initialSlide | Number | `0` | Default slide to show |
| slideToShow | Number | `2` | Number of slides to be shown |
| slideToScroll | Number | `1` | Number of slides to scroll on slide |
| transitionDuration | Number | `300` | Milliseconds of transition animation |
| gutter | Number | `0` | Percentage of space between slides |
| onSlide | Function | `null` | Function called on click of both arrows |
| onPrev | Function | `null` | Function called on click of left arrow |
| onNext | Function | `null` | Function called on click of right arrow |
