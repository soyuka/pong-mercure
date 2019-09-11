import Two from 'two.js'
import Player from './Player.js'
import { getRandomInt } from './utils.js'
import Spring from './Spring.js'

function initSprings(two, gameOptions) {
  const springs = []

  for (let i = 0; i < gameOptions.springsNumber; i++) {
    springs.push(Spring(two, {
      ...gameOptions,
      previous: i === 0 ? undefined : springs[i - 1].line,
      x: gameOptions.springXPosition,
      y: 0
    }))
  }

  return springs
}

Game.gameOptions = {
  gravity: 9.0,
  mass: 1.0,
  stiffness: 0.20,
  damping: 0.7,
  springsNumber: 8
}

function Game(gameOptions = Game.gameOptions) {
  const container = document.getElementById('game')
  const two = new Two({
    autostart: true,
    fullscreen: true
  }).appendTo(document.body);
  gameOptions = {...Game.gameOptions, ...gameOptions, springXPosition: two.width / 2}
  let springs

  function init() {
    console.debug('Start with game options %j', gameOptions)
    springs = initSprings(two, gameOptions)
    Player(two, {springs, ...gameOptions})
    two.play()
  }

  function reset() {
    // clear springs?
    // springs.forEach(e => e.clear())
    two.pause()
    two.clear()
  }

  return {
    two, init, reset
  }
}

export default Game
