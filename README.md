# Monoco

Custom (squircle) corners for html elements. [Demo](https://monokai.github.io/monoco-demo/)

## Installation

```sh
npm install @monokai/monoco
```

## Options

| Option | Type | Description |
| --- | --- | --- |
| background | string | background color |
| smoothing | number | Smoothing factor of the corners (between 0 and 1, default: 1) |
| radius | number \| number[] | Radius of the corners, or array [top left, top right, bottom right, bottom left] |
| offset | number \| number[] | Offset of the corners, or array [top, right, bottom, left] |
| border | [number, string][] | Border of the corners, or array of borders |
| type | 'squircle' \| 'figma-squircle' \| 'round' \| 'round-inverse' \| 'flat' \| 'inset' | Corner type |
| clip | boolean | Use clip-path on element |
| width | number | Width of the element (default: auto) |
| height | number | Height of the element (default: auto) |
| observe | boolean | Observe element for resize (default: true) |
| onResize | (rect:DOMRect, element:HTMLElement) => void | Callback when element resizes |
| precision | number | Precision of the path (default: 3) |
| isRounded | boolean | Use rounded values for width and height

## Notes

Monoco generates an SVG representation of the provided options and stores it as a `background-image` on the element. This means that when the element already has a background color, it will show through. Any previously defined background image value will be overwritten.

If you want to use a background color, you can omit the `background` option in Monoco and set the `clip` option to `true`. This will use `clip-path` instead of `background-image`.

Using a clip path has some implications. If you want to use a `drop-shadow` css filter for example, you can't use `clip`, as clip paths also clip the shadow.

Note that `box-shadow` css values are not supported, as it doesn't take the svg shape into account. You have to use something like this instead:

```css
.element {
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5));
}
```

## Example usage

```ts
import { addCorners, draw, unobserve } from '@monokai/monoco'

const element = document.getElementById('element')

// use clip
addCorners(element, {
  smoothing: 1,
  radius: 32,
  clip: true
})

// use background svg
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  radius: 32,
})

// multi-radius (top left, top right, bottom right, bottom left)
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  radius: [32, 4, 8, 16],
})

// offset
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  radius: 32,
  offset: 16
})

// multi-offset (top, right, bottom, left)
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  radius: 32,
  offset: [16, 4, 2, 8]
})

// border
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  radius: 32,
  border: [4, '#f00']
})

// multi-border
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  radius: 32,
  border: [
    [4, '#f00'],
    [2, '#0f0'],
    [8, '#00f'],
    [16, '#ff0']
  ]
})

// corner type
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  radius: 16,
  type: 'round-inverse'
})

// observe (default: true) redraws when element triggers resize observer, you can optionally turn this off
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  radius: 32,
  observe: false
})

// unobserve element, removes the element from the resize observer
unobserve(element)

// manual redraw corners on element, options are optional
draw(element, options)

// manual redraw corners on all elements
draw()
```
