import Two from 'two.js'
import Player from './Player.js'
import { getRandomInt } from './utils.js'

function Knot(two, {x, y, previous, gravity, mass, stiffness, damping, end}) {
  // const gravity = 9.0;
  // const mass = 2.0;
  const height = 40
  // const stiffness = 0.15;
  // const damping = 0.7;

  if (previous) {
    x = previous.vertices[0].x
    y = previous.vertices[0].y
  }

  let vx = 0; // The x- and y-axis velocities
  let vy = 0;

  // update with next
  let targetX = x
  let targetY = y

  const line = two.makeLine(x, y, x, y + height)

  if (!previous) {
    window.addEventListener('mousemove', function(event) {
      targetX =  event.clientX
      targetY =  event.clientY
    })
  }

  const center = two.width / 2
  let inc = -1
  let max = 5

  two.bind('update', function(frameCount) {
    // if (end === true && frameCount) {
    //   if (targetX <= center - max) {
    //     inc = 0.5
    //   } else if (targetX >= center + max) {
    //     inc = -0.5
    //   }
    //
    //   targetX += inc
    //
    //   // targetX = line.vertices[0].x
    //   // targetX = getRandomInt(center - 20, center + 20)
    //   // targetY =  event.clientY
    // } else if (previous) {
    if (previous) {
      targetX = previous.vertices[1].x
      targetY = previous.vertices[1].y
    }

    let xpos = line.vertices[1].x
    let forceX = (targetX - xpos) * stiffness;
    let ax = forceX / mass;
    vx = damping * (vx + ax);
    let ypos = line.vertices[1].y
    let forceY = (targetY - ypos) * stiffness;
    forceY += gravity;
    let ay = forceY / mass;
    vy = damping * (vy + ay);

    if (previous) {
      line.vertices[0].x = previous.vertices[1].x
      line.vertices[0].y = previous.vertices[1].y
    } else {
      line.vertices[0].x = targetX
      line.vertices[0].y = targetY
    }

    line.vertices[1].x += vx
    line.vertices[1].y += vy
  })
  return line
}

function Game() {
  const container = document.getElementById('game')
  const two = new Two({
    autostart: true,
    fullscreen: true
  }).appendTo(document.body);

  let s1,s2,s3,s4,s5,s6

  function init(gameOptions = {
    gravity: 9.0,
    mass: 3.0,
    stiffness: 0.15,
    damping: 0.7
  }) {
    // Player(two)
    s1 = Knot(two, {x: two.width / 2, y: 0, ...gameOptions, end: true})
    s2 = Knot(two, {previous: s1, ...gameOptions})
    s3 = Knot(two, {previous: s2, ...gameOptions})
    s4 = Knot(two, {previous: s3, ...gameOptions})
    s5 = Knot(two, {previous: s4, ...gameOptions})
    s6 = Knot(two, {previous: s5, ...gameOptions})
    two.play()
  }

  function reset() {
    two.pause()
    two.clear()
    s1 = s2 = s3 = s4 = s5 = s6 = undefined
  }

  return {
    two, init, reset
  }
}

export default Game

// function setup() {
//   createCanvas(720, 400);
//   fill(255, 126);
//   // Inputs: x, y, mass, gravity
//   s1 = new Spring2D(0.0, width / 2, mass, gravity);
//   s2 = new Spring2D(0.0, width / 2, mass, gravity);
//   s3 = new Spring2D(0.0, width / 2, mass, gravity);
// }
//
// function draw() {
//   background(0);
//   s1.update(mouseX, mouseY);
//   s1.display(mouseX, mouseY);
//   s2.update(s1.x, s1.y);
//   s2.display(s1.x, s1.y);
//   s3.update(s2.x, s2.y);
//   s3.display(s2.x, s2.y);
// }
//
// function Spring2D(xpos, ypos, m, g) {
//   this.x = xpos;// The x- and y-coordinates
//   this.y = ypos;
//   this.vx = 0; // The x- and y-axis velocities
//   this.vy = 0;
//   this.mass = m;
//   this.gravity = g;
//   this.radius = 30;
//   this.stiffness = 0.2;
//   this.damping = 0.7;
//
//   this.update = function(targetX, targetY) {
//     let forceX = (targetX - this.x) * this.stiffness;
//     let ax = forceX / this.mass;
//     this.vx = this.damping * (this.vx + ax);
//     this.x += this.vx;
//     let forceY = (targetY - this.y) * this.stiffness;
//     forceY += this.gravity;
//     let ay = forceY / this.mass;
//     this.vy = this.damping * (this.vy + ay);
//     this.y += this.vy;
//   }
//
//   this.display = function(nx, ny) {
//     noStroke();
//     ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
//     stroke(255);
//     line(this.x, this.y, nx, ny);
//   }
// }
//

