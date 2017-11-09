# React-carousel-component

> Carousel component for react

## Usage
```js
class Exemple extends React.Component {
  render () {
    const items = [1, 2, 3, 4, 5]

    const settings = {
      currentSlide: 3,
      beforeNext: _ => console.log('Next arrow clicked')
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
| hideDots | Boolean | `false` | Hide dots |
| transitionDuration | Number | `500` | Milliseconds of transition animation |
| gutter | Number | `0` | Percentage of space between slides |
| beforeSlide | Function | `null` | Function called on click of arrows before transition start |
| afterSlide | Function | `null` | Function called on click of arrows after the end of transition |
| beforePrev | Function | `null` | Function called on click of left arrow before transition start |
| afterPrev | Function | `null` | Function called on click of left arrow after the end of transition |
| beforeNext | Function | `null` | Function called on click of right arrow before transition start |
| afterNext | Function | `null` | Function called on click of right arrow after the end of transition |
