'use strict' 

let windowWidth = window.innerWidth
let windowHeight = window.innerHeight

window.addEventListener('resize', (e) => {
  windowWidth = window.innerWidth
  windowHeight = window.innerHeight
})

const VIEWPORT_WIDTH = 480
const VIEWPORT_HEIGHT = 320

const LINES_DISTANCE = 26
let linesAmount = Math.floor(windowHeight / LINES_DISTANCE)
let viewportLineDistance = VIEWPORT_HEIGHT / linesAmount

const POINTS_MIN_DISTANCE = 320
const POINTS_AMOUNT = Math.floor(windowWidth / POINTS_MIN_DISTANCE)
const Y_AMPLITUDE = 20

let xDiapason = VIEWPORT_WIDTH / POINTS_AMOUNT
let xAmplitude = xDiapason / 3

const TIMER_INCREASE = 0.01

export default {
  windowWidth,
  windowHeight,

  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,

  LINES_DISTANCE,
  linesAmount,
  viewportLineDistance,

  POINTS_AMOUNT,
  Y_AMPLITUDE,

  xDiapason,
  xAmplitude,

  TIMER_INCREASE,
}