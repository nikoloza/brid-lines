'use strict'
import settings from './settings.js'
import { loading, init } from './loading.js'
import { randomXPoints, createArray } from './helpers.js'
import { log, putCircle } from './development.js'

const $path = document.querySelector('.lines')

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

const LETTERS = document.querySelectorAll('.letter')
const LETTERS_PROPERTIES = createArray(LETTERS.length)

const LETTERS_ROTATION = () => {
  LETTERS_PROPERTIES.map((DOMObj, key) => {
    DOMObj = LETTERS[key]

    let x = Math.sin(timer * (key ^ 1)) * 25
    let y = Math.cos(timer * (key ^ 1)) * 25
    let transformTranslate = `translate3d(${x}px, ${y}px, 1px)`

    let rotate = Math.sin(timer * key / 10) * 10
    let transformRotate = `rotate(${rotate}deg)`
    
    let scale = Math.sin(timer)
    // let transformScale = `scale(${scale})`
    let transformScale = `scale(1)`
    
    let transform = `${transformTranslate} ${transformRotate} ${transformScale}`

    DOMObj.setAttribute('style', `transform: ${transform}`)
  })
}

function update () {
  timer += settings.TIMER_INCREASE
  let joinedPath = PATHS_ARRAY().join(' ')
  $path.setAttribute('d', joinedPath)
  // PATH2.setAttribute('d', joinedPath)
  LETTERS_ROTATION()
  window.requestAnimationFrame(update)
}

update()
loading(init)
