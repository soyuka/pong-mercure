import { getRandomInt, getLineCoordinates } from './utils.js'

function getPlayerPosition(player) {
  const rect = player.group.getBoundingClientRect()
  const midY = (rect.bottom - rect.top) / 1.4 // gravity center?
  const midX = (rect.right - rect.left) / 2

  return {
    x: rect.left + midX,
    y: rect.top + midY
  }
}

function Player(two, {springsNumber, springs, springXPosition}) {
  const headHeight = 5
  const lastSpring = springs[springsNumber - 1]
  const minY = two.height - 9.4 * headHeight // ground
  // const minY = lastSpring.line.vertices[1].y
  const player = init({x: springXPosition, y: minY})

  two.bind('update', function(frameCount) {
    const {x, y} = getPlayerPosition(player)
    player.group.translation.y -= y - lastSpring.line.vertices[1].y
    player.group.translation.x -= x  - lastSpring.line.vertices[1].x
    // player.translation.y
    // if (-player.translation.y < two.height / 2) {
    //   player.translation.y -= getRandomInt(0, 4)
    // }

    if (frameCount % 60 === 0) {
      // arm.vertices[1].x = armPositionEnd.x
      // arm.vertices[1].y = armPositionEnd.y
      return
    }

    if (frameCount % 30 === 0) {
      //player.vertices.map((v) => v.y += 10)
      // arm.vertices[1].x = armPositionEndMoved.x
      // arm.vertices[1].y = armPositionEndMoved.y
      // console.log('test', frameCount)
    }

  })

  function init({x, y}) {
    const head = two.makeEllipse(x, y, headHeight, headHeight)
    const bodyHeight = 6 * headHeight
    const body = two.makeLine(x, y + headHeight, x, y + bodyHeight)

    const armLength = 3 * headHeight
    const armPositionStart = {x, y: y + bodyHeight/3}

    const armLeftPositionEnd = getLineCoordinates(armPositionStart.x, armPositionStart.y, -30, armLength, 'left')
    const armLeft = two.makeLine(armPositionStart.x, armPositionStart.y, armLeftPositionEnd.x, armLeftPositionEnd.y)

    const armRightPositionEnd = getLineCoordinates(armPositionStart.x, armPositionStart.y, 10, armLength, 'left')
    const armRight = two.makeLine(armPositionStart.x, armPositionStart.y, armRightPositionEnd.x, armRightPositionEnd.y)

    const legLength = 3.4 * headHeight
    const legPositionStart = {x, y: y + bodyHeight}
    const legRightPositionEnd = getLineCoordinates(legPositionStart.x, legPositionStart.y, -30, legLength, 'left')
    const legRight = two.makeLine(x, y + bodyHeight, legRightPositionEnd.x, legRightPositionEnd.y)

    const legLeftPositionEnd = getLineCoordinates(legPositionStart.x, legPositionStart.y, -50, legLength, 'left')
    const legLeft = two.makeLine(x, y + bodyHeight, legLeftPositionEnd.x, legLeftPositionEnd.y)

  // const legLeft = two.makeLine(x, y + bodyHeight, x - legLength, y + bodyHeight+18)
  // const legRight = two.makeLine(x, y + bodyHeight, x - legLength, y + bodyHeight+5)
    const group = two.makeGroup(head, body, armLeft, armRight, legLeft, legRight)
    return {
      group,
      body
    }
  }
}

export default Player
