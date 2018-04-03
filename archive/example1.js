const SVG = document.querySelector('.animated-lines')
const PATH = document.createElementNS('http://www.w3.org/2000/svg', 'path')

const VIEWPORT_WIDTH = 480
const VIEWPORT_HEIGHT = 320

const LINES_AMOUNT = 20
const DISTANCE = VIEWPORT_HEIGHT / LINES_AMOUNT
const POINTS_AMOUNT = 7
const AMPLITUDE = 40

var pathDString = ''

for (let i = 0; i < LINES_AMOUNT; i++) {
  let currentDistance = DISTANCE * i

  // let pointX = VIEWPORT_WIDTH / 4
  let pointX = (
    Math.cos(i / 10) * 50 + VIEWPORT_WIDTH / 4
  ).toFixed(2)
  let pointY = currentDistance + AMPLITUDE
  
  console.log(Math.sin(i / 1) * 50)
  
  let midX = (
    Math.sin(i / 10) * 50 + VIEWPORT_WIDTH / 2
  ).toFixed(2)
  let midY = currentDistance

  let endX = VIEWPORT_WIDTH
  let endY = currentDistance
  
  pathDString += 
    ' M' + 0      + ', ' + currentDistance +
    ' Q' + pointX + ', ' + pointY + 
     ' ' + midX   + ', ' + midY +
    ' T' + endX   + ', ' + endY

  putCircle(pointX, pointY, 2, 'green', currentDistance, midX, midY, pointX, pointY)
  putCircle(midX, midY)
}

PATH.setAttribute('d', pathDString)

SVG.appendChild(PATH)

function putCircle (x, y, r = 4, color = 'red', currentDistance, midX, midY, pointX, pointY) {
  let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('fill', color)
  circle.setAttribute('r', r)
  circle.setAttribute('cx', x)
  circle.setAttribute('cy', y)
  
  SVG.appendChild(circle)
  if (currentDistance === undefined) return

  let dash1 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  dash1.setAttribute('x1', 0)
  dash1.setAttribute('y1', currentDistance)
  dash1.setAttribute('x2', pointX)
  dash1.setAttribute('y2', pointY)
  SVG.appendChild(dash1)

  let dash2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  dash2.setAttribute('x1', midX)
  dash2.setAttribute('y1', midY)
  dash2.setAttribute('x2', pointX)
  dash2.setAttribute('y2', pointY)
  SVG.appendChild(dash2)
}