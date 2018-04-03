'use strict'

/**
 * Put SVG circles on points
 */
export function putCircle (svg, x, y, r = 3, color = 'red') {
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('fill', color)
  circle.setAttribute('r', r)
  circle.setAttribute('cx', x)
  circle.setAttribute('cy', y)
  svg.appendChild(circle)
}

/**
 * Easier log
 */
export function log () {
  console.log(...arguments)
}