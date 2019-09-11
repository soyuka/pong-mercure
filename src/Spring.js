function Spring(two, {x, y, previous, gravity, mass, stiffness, damping, special}) {
  if (previous) {
    x = previous.vertices[0].x
    y = previous.vertices[0].y
  }

  let vx = 0 // The x- and y-axis velocities
  let vy = 0
  let targetX = x
  let targetY = y

  const line = two.makeLine(x, y, x, y)

  // debug stuff to reproduce p5.js demo see below
  // if (!previous) {
    // window.addEventListener('mousemove', function(event) {
    //   targetX =  event.clientX
    //   targetY =  event.clientY
    // })
  // }

  let inc = 0

  two.bind('update', function(frameCount) {
    if (frameCount % 90 === 0) {
      inc = Math.random()
    } else if (frameCount % 45 === 0) {
      inc = -Math.random()
    }

    if (previous) {
      targetX = previous.vertices[1].x + inc
      targetY = previous.vertices[1].y
    }

    // adapted from https://p5js.org/examples/simulate-chain.html
    // I think comes from https://en.scratch-wiki.info/wiki/Rope_Physics
    let xpos = line.vertices[1].x
    let forceX = (targetX - xpos) * stiffness;
    let ax = forceX / mass;
    vx = damping * (vx + ax);
    let ypos = line.vertices[1].y
    let forceY = (targetY - ypos) * stiffness;
    forceY += gravity;
    let ay = forceY / mass;
    vy = damping * (vy + ay);

    line.vertices[0].x = previous ? previous.vertices[1].x : targetX
    line.vertices[0].y = previous ? previous.vertices[1].y : targetY
    line.vertices[1].x += vx
    line.vertices[1].y += vy
  })

  return { line }
}

export default Spring
