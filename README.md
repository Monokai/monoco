# Monoco

Custom (squircle) corners for html elements.

- [Demo](https://somonoco.com)
- [React version](https://github.com/monokai/monoco-react)
- [Svelte version](https://github.com/monokai/monoco-svelte)

## Installation

```sh
npm install @monokai/monoco
```

## Options

| Option | Type | Description |
| --- | --- | --- |
| background | string | Background color |
| smoothing | number | Smoothing factor of the corners (between 0 and 1, default: 1) |
| borderRadius | number \| number[] | Radius of the corners, or array [top left, top right, bottom right, bottom left] |
| offset | number \| number[] | Offset of the corners, or array [top, right, bottom, left] |
| border | [number, string] \| [number, string][] \| [number, number, string[]] \| [number, number, string[]][] | Border [size, color] or [size, angle, [color-stop1, color-stop2, …]]. Can be a single tuple or array of tuples. |
| cornerType | {width:number, height:number, radii:number[], offsets:number[]} => (string\|number)[][] | Corner type function (default: Squircle) |
| clip | boolean | Use clip-path on element |
| width | number | Width of the element (default: auto) |
| height | number | Height of the element (default: auto) |
| observe | boolean | Observe element for resize (default: true) |
| onResize | ({width: number, height: number}, element:HTMLElement) => void | Callback when element resizes |
| precision | number | Precision of the path decimal points (default: 3) |
| isRounded | boolean | Use rounded values for width and height (default: false)

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
import {
  addCorners,
  draw,
  unobserve,

  // corner types:
  FigmaSquircle,
  Flat,
  Inset
  Round,
  RoundInverse,
  Squircle
} from '@monokai/monoco'

const element = document.getElementById('element')

// use clip
addCorners(element, {
  smoothing: 1,
  borderRadius: 32,
  clip: true
})

// use background svg
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: 32,
})

// multi-borderRadius (top left, top right, bottom right, bottom left)
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: [32, 4, 8, 16],
})

// offset
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: 32,
  offset: 16
})

// multi-offset (top, right, bottom, left)
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: 32,
  offset: [16, 4, 2, 8]
})

// border
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: 32,
  border: [4, '#f00']
})

// multi-border
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: 32,
  border: [
    [4, '#f00'],
    [2, '#0f0'],
    [8, '#00f'],
    [16, '#ff0']
  ]
})

// border gradient
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: 32,
  border: [4, 45, ['#f00', '#00f']]
})

// multi-border gradient with offsets
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: 32,
  border: [
    [4, 45, ['#f00', '#0f0 0.2', '#00f']],
    [4, 90, ['#f00', '#0f0 0.4', '#00f 50%', '#fff']]
  ]
})

// corner type
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: 16,
  cornerType: RoundInverse
})

// observe (default: true) redraws when element triggers resize observer, you can optionally turn this off
addCorners(element, {
  background: '#f00',
  smoothing: 1,
  borderRadius: 32,
  observe: false
})

// unobserve element, removes the element from the resize observer
unobserve(element)

// manual redraw corners on element, options are optional
draw(element, options)

// manual redraw corners on all elements
draw()
```

## Difference between the default squircle and the Figma squircle.

The default corner type is `Squircle`. You can also use the `FigmaSquircle` corner type to match the corners as they are calculated in Figma. The difference is subtle, but it has to do with the fact the Figma preserves more of the round shape in certain conditions where the radius is big, whereas `Squircle` preserves more of the smooth squircle shape.

## Custom corner types

You can define your own corner types by providing a function to the `cornerType`. The function receives an object with the following properties:

```ts
{
  width: number,
  height: number,
  radii: number[],
  offsets: number[]
}
```

You can optionally add your own properties to this options object and use them in your custom function. Your function should return an array of SVG path commands, for example:

```ts
return [
  ['M', 0, 0],
  ['L', width, 0],
  ['L', width, height],
  ['L', 0, height],
  ['Z']
];
```
