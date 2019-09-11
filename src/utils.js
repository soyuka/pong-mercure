/**
 * Get line coordinates with:
 * @param {Number} x Start x position
 * @param {Number} y Start y position
 * @param {Number} angle Angle in degrees
 * @param {Number} length Length of the line
 * @param {string} direction left or right
 *
 * @return {Object} {x, y} end coordinates
 */
export function getLineCoordinates(x, y, angle, length, direction) {
  direction = direction === 'left' ? -1 : 1
  angle = angle * (Math.PI / 180)
  return {
    x: x + Math.cos(angle) * length * direction,
    y: y + Math.sin(angle) * length * direction,
  }
}

export function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
