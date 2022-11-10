# beautiful-web-animations

Yet another collection of pre-made animations made for the web :)

See them all in action here: https://thibaultjanbeyer.github.io/beautiful-web-animations/

## Bubble Explosion

Usage:

```JavaScript
const BE = BubbleExplosion({ 
  element: document.querySelector('div'), // the element that will get animated
  eventListener: 'click', // optional, event on which the animation will start
  content: '✅', // optional, this is the valid CSS content, default are bubbles (more info: https://developer.mozilla.org/en-US/docs/Web/CSS/content)
  particles: { // optional, particles settings
    size: 10, // optional, size of the explosion particles
    direction: 'up', // optional, direction for the particles to fly (up|down)
    amount: 25, // optional, amount of particles to generate
  }
  areaSize: { // optional, area size of the explosion
    x: 100, // optional, width of the explosion
    y: 100, // optional, height of the explosion
  },
  isAppearing: false, // optional, if true, it reverses the animation (appears instead of disappearing)
})

BE.trigger() // if no event listener is how you can trigger the animation programmatically

BE.destroy() // cleans up the animation by removing the nodes from the DOM
```

See examples section:
- [default](https://thibaultjanbeyer.github.io/beautiful-web-animations/#be)
- [with custom content](https://thibaultjanbeyer.github.io/beautiful-web-animations/#bec)

![Bubble Explosion](./bubble-explosions.gif)

### Preload included!

You can also use URLs in your content props. Those will be preloaded before triggering the animation in order to always see the image!

```CSS
content: "url(https://cataas.com/cat)"
```
