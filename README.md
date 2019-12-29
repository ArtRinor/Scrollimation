# Scrollimation

> A flexible library for animation of elements on scroll.

[![NPM Version](https://img.shields.io/npm/v/scrollimation.svg)](https://www.npmjs.com/package/scrollimation)
[![License](https://img.shields.io/npm/l/scrollimation.svg)](https://www.npmjs.com/package/scrollimation)
[![Travis (.org)](https://img.shields.io/travis/ArtRinor/Scrollimation.svg)](https://travis-ci.org/ArtRinor/Scrollimation)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/scrollimation.svg)](https://bundlephobia.com/result?p=scrollimation)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

## Getting Started

### Install

```bash
npm i -S scrollimation
```

Or load via **CDN**.

```html
<script type="text/javascript" src="https://unpkg.com/scrollimation"></script>
```

### Usage

```javascript
import Scrollimation from 'scrollimation'

let instance = Scrollimation({
	target: '#target',
	from: 0,
	to: 100,
	step: function(state) {
		let rotate = state.calc(0, 180)
		let opacity = state.calc(1, 0)

		state.target[0].style.transform = `rotate(${rotate}deg)`
		state.target[0].style.opacity = opacity
	}
})
```

If you use jQuery try this:

```javascript
import $ from 'jquery'
window.$ = $
require('scrollimation')

let instance = $('#target').scrollimation({
	from: 0,
	to: 100,
	step: function(state) {
		let rotate = state.calc(0, 180)
		let opacity = state.calc(1, 0)

		state.target.css({
			transform: `rotate(${rotate}deg)`,
			opacity
		})
	}
})
```

## Options

### target

| Default     | Type                                                 |
| :---------- | :--------------------------------------------------- |
| `undefined` | HTMLElement \| NodeList \| Array \| String \| JQuery |

Stores the value in the state. If it is a NodeList it is converted to an Array. You can leave this parameter empty.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	}
})
```

### scrollContainer

| Default  | Type                  |
| :------- | :-------------------- |
| `window` | HTMLElement \| String |

Change this value if it is assumed that the scroll position does not depend on page scrolling.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	scrollContainer: document.querySelector('#container'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	}
})
```

### from

| Default | Type   |
| :------ | :----- |
| `0`     | Number |

The scroll position from which animation begins. In `step` function with current scroll position `state.calc` returns a value equal to its first parameter.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 100,
	to: 200,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	}
})
```

### to

| Default | Type   |
| :------ | :----- |
| `0`     | Number |

The scroll position from which animation ends. In `step` function with current scroll position `state.calc` returns a value equal to its second parameter.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	}
})
```

### direction

| Default | Type   |
| :------ | :----- |
| `top`   | Number |

Use if you need an animation on the horizontal scrolling.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	duration: 'left',
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	}
})
```

### easing

| Default  | Type               |
| :------- | :----------------- |
| `linear` | String \| Function |

Determines the acceleration curve of your animation.

| constant | accelerate  | decelerate   | accelerate-decelerate |
| :------- | :---------- | :----------- | :-------------------- |
| linear   | easeInQuad  | easeOutQuad  | easeInOutQuad         |
|          | easeInCubic | easeOutCubic | easeInOutCubic        |
|          | easeInQuart | easeOutQuart | easeInOutQuart        |
|          | easeInQuint | easeOutQuint | easeInOutQuint        |

You can use custom function:

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	easing: val => val * val,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	}
})
```

Also you can use for each `state.calc` different easing function:

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0, 'easeInOutQuad')
	}
})
```

### mode

| Default                 | Type   |
| :---------------------- | :----- |
| `requestAnimationFrame` | String |

If your animation is too heavy, you can try using `mode: 'onscroll'`.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	mode: 'onscroll',
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	}
})
```

### fpsLimit

| Default     | Type   |
| :---------- | :----- |
| `undefined` | Number |

If your animation is too heavy, you can also limits the number of animation steps per second. (with `undefined` value FPS will be around 60)  
You can try to combine this with `mode: 'onscroll'`.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	fpsLimit: 30,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	}
})
```

### step

| Default    | Type     |
| :--------- | :------- |
| `() => {}` | Function |

This function is called to redraw animated elements. The parameter is an instance of the animation. Inside the animation instance, you can use the `state.calc` function, using which you can calculate the animated values.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
		// if scrollTop === state.from (0) state.calc(1, 0) return 1
		// else if scrollTop === state.to (100) state.calc(1, 0) return 0
	}
})
```

### init

| Default    | Type     |
| :--------- | :------- |
| `() => {}` | Function |

This function is called when `Scrollimation` initialize current animation instance when the animation is not already running.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	},
	init: state => {
		console.log('Animation instance initialized!')
	}
})
```

### start

| Default    | Type     |
| :--------- | :------- |
| `() => {}` | Function |

This function called when the animation begins when the scroll position is state.from. (Only while scrolling from state.from to state.to)  
It called before the first `step` function is called.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	},
	start: state => {
		console.log('Current scroll position is ' + state.from)
	}
})
```

### end

| Default    | Type     |
| :--------- | :------- |
| `() => {}` | Function |

This function called when the animation ends when the scroll position is state.to. (Only while scrolling from state.from to state.to)  
It called after the last `step` function is called.

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	},
	end: state => {
		console.log('Current scroll position is ' + state.to)
	}
})
```

### reverseStart

| Default    | Type     |
| :--------- | :------- |
| `() => {}` | Function |

This function called when the reverse animation begins when the scroll position is state.to. (Only while scrolling from state.to to state.from)

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	},
	reverseStart: state => {
		console.log('Current scroll position is ' + state.to)
	}
})
```

### reverseEnd

| Default    | Type     |
| :--------- | :------- |
| `() => {}` | Function |

This function called when the reverse animation ends when the scroll position is state.from. (Only while scrolling from state.to to state.from)

```javascript
Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	},
	reverseEnd: state => {
		console.log('Current scroll position is ' + state.from)
	}
})
```

## Additional functions

### stop

Stops the animation.

```javascript
let instance = Scrollimation({
	target: document.querySelector('#target'),
	from: 0,
	to: 100,
	step: state => {
		state.target.style.opacity = state.calc(1, 0)
	}
})

instance.stop()
```

### play

Starts the stopped animation.

```javascript
let instance = Scrollimation({
  target: document.querySelector('#target'),
  from: 0,
  to: 100,
  status = 'pause',
  step: (state) => {
    state.target.style.opacity = state.calc(1, 0)
  }
})

instance.play()
```

### remove

Removes the animation handler permanently. Use if playing animation is never needed again.

```javascript
Scrollimation({
  target: document.querySelector('#target'),
  from: 0,
  to: 100,
  status = 'pause',
  step: (state) => {
    state.target.style.opacity = state.calc(1, 0)

    if (document.body.scrollTop === state.to) state.remove() // Animation is played only once.
  }
})

instance.play()
```

## Running the tests

```bash
npm test
```

## Author

-   **Ilya Chirkov** - _Initial work_ - [ArtRinor](https://github.com/ArtRinor)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
