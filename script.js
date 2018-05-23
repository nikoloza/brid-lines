'use strict'
import settings from './settings.js'
import { randomXPoints, createArray } from './helpers.js'
import { log, putCircle } from './development.js'

const PATH = document.querySelector('.animated-lines')

let timer = settings.TIMER_INCREASE
let randomXPointsArray = randomXPoints(settings.POINTS_AMOUNT)

const PATHS_ARRAY = () => {
  return createArray(settings.linesAmount + 10).map((value, key) => {
    let currentDistance = settings.viewportLineDistance * key - settings.Y_AMPLITUDE

    var randomAngle = (Math.random() - .5) * 3

    var pointsArray = randomXPointsArray.map((value, pointKey) => {
      var randomSin = -Math.sin(pointKey ^ 1) >= .5 ? 'sin' : 'cos'
      
      let x = (pointKey === randomXPointsArray.length - 1) 
        ? settings.VIEWPORT_WIDTH + settings.xAmplitude
        : value + -Math[randomSin](key / 20 + timer) * 20
      let y = 
          currentDistance + Math.cos(key / 10 + timer) * settings.Y_AMPLITUDE

      // putCircle(SVG, x, y, .5, 'yellow')
      return `${x.toFixed(3)}, ${y.toFixed(3)}`
    })

    let pointX = randomXPointsArray[0] / 5 + timer * 10
    let pointY = currentDistance + 
      Math.sin(key / 3 + timer) * settings.Y_AMPLITUDE

    // putCircle(SVG, pointX, pointY, 1, 'green')

    return (
      ' M' + 0      + ', ' + currentDistance +
      ' Q' + pointX + ', ' + pointY + 
      ' ' + pointsArray.join(' T')
    )
  })
}


const LETTERS = document.querySelectorAll('mask .letter')
const LETTERS_PROPERTIES = createArray(LETTERS.length)

const LETTERS_ROTATION = () => {
  LETTERS_PROPERTIES.map((DOMObj, key) => {
    DOMObj = LETTERS[key]

    let x = Math.sin(timer * (key ^ 1)) * 25
    let y = Math.cos(timer * (key ^ 1)) * 25
    let rotate = Math.sin(timer * key / 10) * 10

    let transformTranslate = `translate3d(${x}px, ${y}px, 1px)`
    let transformRotate = `rotate(${rotate}deg)`
    let transform = `${transformTranslate} ${transformRotate}`

    DOMObj.setAttribute('style', `transform: ${transform}`)
  })
}

function update () {
  timer += settings.TIMER_INCREASE
  let joinedPath = PATHS_ARRAY().join(' ')
  PATH.setAttribute('d', joinedPath)
  // PATH2.setAttribute('d', joinedPath)
  LETTERS_ROTATION()
  window.requestAnimationFrame(update)
} 
update()

// const MOUSE_CONTAINER = document.querySelector('.mouse-container')
// document.addEventListener('mousemove', (e) => {
//   let { x, y } = e
//   let mouseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
//   mouseCircle.classList.add('mouse')

//   x =  x / settings.windowWidth * settings.VIEWPORT_WIDTH - 7
//   y =  y / settings.windowHeight * settings.VIEWPORT_HEIGHT - 7

//   let translate = `translate3d(${parseInt(x)}px, ${parseInt(y)}px, 1px)`
//   let transform = `transform: ${translate}`
  
//   mouseCircle.setAttribute('style', transform)
//   MOUSE_CONTAINER.appendChild(mouseCircle)

  
//   let t = window.setTimeout(() => {
//     mouseCircle.setAttribute('style', transform + ' scale(0)')
    
//     t = window.setTimeout(() => {
//       mouseCircle.remove()
//       window.clearTimeout(t)
//     }, 2000)
//   })
// })

// const MOUSE_CIRCLE = document.querySelector('.mouse')
// document.addEventListener('mousemove', (e) => {
//   let { x, y } = e

//   x =  x / settings.windowWidth * settings.VIEWPORT_WIDTH - 26
//   y =  y / settings.windowHeight * settings.VIEWPORT_HEIGHT - 26

//   let translate = `translate3d(${x}px, ${y}px, 1px)`
//   let transform = `transform: ${translate}`
//   MOUSE_CIRCLE.setAttribute('style', transform)
// })