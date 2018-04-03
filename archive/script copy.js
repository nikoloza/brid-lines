var svgEl = document.querySelector('.animated-lines')

var randomRange = function(min, max) {
  return ~~(Math.random() * (max - min + 1)) + min
}

const numberOfLines = 20
const numberOfPoints = 6
const viewportW = 400
const viewportH = 220
const lineDataArr = []

function createPathString () {
  let completedPath = ''

  // pixel range from 0, aka how deeply they bend
  const ampl = 10
  const speed = 100

  for (let i = 0; i < numberOfLines; i++) {
    const PATH = lineDataArr[i]

    var current = {
      x: ampl * Math.sin(PATH.counter / speed),
      y: ampl * Math.cos(PATH.counter / speed)
    }

    const pointX = PATH.pointX
    const pointY = Math.sin(current.y)

    const midX = Math.atan(PATH.counter / speed) * current.x / 1 + PATH.midX
    const midY = current.y / 1 + PATH.midY

    console.log(pointY, midY)

    var newPathSection = 'M' + PATH.startX + ', ' + PATH.startY +
      // 1.5 to amp up the bend a little
      ' Q' + pointX + ', ' + pointY + 
       ' ' + midX + ', ' + midY +
      ' T' + PATH.endX + ', ' + PATH.endY + ' '

    PATH.counter += 1
    completedPath += newPathSection
  }

  return completedPath
}

function createLines () {
  var newPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')

  const counter = 100
  
  const pointX = randomRange(100, 150)
  const midX = randomRange(150, 200)
  
  // create an arr which contains objects for all lines
  // createPathString() will use this array
  for (var i = 0; i < numberOfLines; i++) {
    let nextSequence = i * (viewportH / numberOfLines)

    var lineDataObj = {
      counter,

      startX: 0,
      startY: nextSequence + Math.random() * 10,

      pointX,

      midX,
      midY: nextSequence,

      endX: viewportW,
      endY: nextSequence + Math.random() * 10,
    }

    lineDataArr.push(lineDataObj)
  }

  function animLoop () {
    newPathEl.setAttribute('d', createPathString())
    requestAnimationFrame(animLoop)
  }

  // once the path elements are created, start the animation loop
  svgEl.appendChild(newPathEl)
  animLoop()
}

createLines()