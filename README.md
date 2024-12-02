# Monoco

Custom corners for html elements.

```ts
import { addCorners, draw, unobserve } from '@monokai/monoco/source'

const element = document.getElementById('element')

// use clip
addCorners(element, {
  smoothing: 1,
  radius: 32,
  clip: true
})

// use background svg
addCorners(element, {
  color: '#f00',
  smoothing: 1,
  radius: 32,
})

// multi-radius (top left, top right, bottom right, bottom left)
addCorners(element, {
  color: '#f00',
  smoothing: 1,
  radius: [32, 4, 8, 16],
})

// offset
addCorners(element, {
  color: '#f00',
  smoothing: 1,
  radius: 32,
  offset: 16
})

// multi-offset (top, right, bottom, left)
addCorners(element, {
  color: '#f00',
  smoothing: 1,
  radius: 32,
  offset: [16, 4, 2, 8]
})

// border
addCorners(element, {
  color: '#f00',
  smoothing: 1,
  radius: 32,
  border: [4, '#f00']
})

// multi-border
addCorners(element, {
  color: '#f00',
  smoothing: 1,
  radius: 32,
  border: [
	[4, '#f00'],
	[2, '#0f0'],
	[8, '#00f'],
	[16, '#ff0']
  ]
})

// mode (squircle, figma-squircle, round, flat)
addCorners(element, {
  color: '#f00',
  smoothing: 1,
  radius: 32,
  mode: 'squircle'
})

// observe (default: true) redraws when element triggers resize observer
addCorners(element, {
  color: '#f00',
  smoothing: 1,
  radius: 32,
  observe: false
})

// unobserve element
unobserve(element)

// manual redraw corners on element
draw(element)

// manual redraw corners on all elements
draw()
```
