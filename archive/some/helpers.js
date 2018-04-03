'use strict'

import settings from './settings.js'

/**
 * Generates random X points by its amount and window width
 */
function randomXPoints () {
  return createArray(settings.POINTS_AMOUNT)
    .map((value, key) => randomNearby(
      settings.xDiapason * key + settings.xDiapason
    ))
}

/**
 * Generate random number for given position
 * and randomize its x axis point by given scale
 */
function randomNearby (number, scale) {
  // If scale is not given, generate it's cannonical point by window width
  if (!scale) scale = settings.xAmplitude
  var random = (Math.random() - .5) * scale
  return number + random
}

/**
 * Make new array and fill with undefined
 */
function createArray (length) {
  return (new Array(length)).fill(void 0)
}

export { 
  randomXPoints, 
  createArray 
}
