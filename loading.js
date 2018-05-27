'use strict'

const $loader = document.querySelector('.loader')
const $loaderMask = document.querySelector('.loader-mask')

let counter = 0

function loading (callback) {
  counter += Math.pow(2,2)
  counter = counter > 100 ? 100 : counter
  $loader.innerHTML = `${parseInt(counter)}%`

  let translate = `translate3d(${counter - 100}%, 0, 1px)`
  $loaderMask.setAttribute('style', `transform: ${translate}`)

  if (counter === 100) return callback()

  window.requestAnimationFrame(() => loading(callback))
}


const $header = document.querySelector('.header')
const $headline = document.querySelector('.headline')
const $social = document.querySelector('.social')
const $letters = document.querySelector('.letters')

function init () {
  $loader.classList.add('hide')

  let t1 = window.setTimeout(() => {
    $loaderMask.classList.add('hide')
    $letters.classList.remove('hide')
    window.clearTimeout(t1)
  }, 650)
  
  let t2 = window.setTimeout(() => {
    window.clearTimeout(t2)
  }, 1250)
  
  let t3 = window.setTimeout(() => {
    $header.classList.remove('hide')
    $headline.classList.remove('hide')
    $social.classList.remove('hide')
    window.clearTimeout(t3)
  }, 2550)
}

export {
  init,
  loading
}