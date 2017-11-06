# React-carousel

> Carouel component for react

## Demo
```shell
yarn
yarn demo
```

## Usage
```js
class Exemple extends React.Component {
  render () {
    const items = [1, 2, 3, 4, 5]

    const settings = {
      currentSlide: 3
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
| currentSlide | Number | `0` | Default slide to show |
| slideToShow | Number | `2` | Number of slides to be shown |
| slideToScroll | Number | `1` | Number of slides to scroll on slide |
| gutter | Number | `0` | Percentage of space between slides |
