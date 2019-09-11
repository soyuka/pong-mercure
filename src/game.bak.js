
// function Game() {
//   const container = document.getElementById('game')
//   const two = new Two({
//     autostart: true,
//     fullscreen: true
//   }).appendTo(document.body);
//
//   const WALL_WIDTH = 100
//
//   const x = two.width / 2
//   const y = 0
//   const length = two.height - 0.05*two.height
//   const space = 20
//   const points = []
//
//   let currL = y
//
//   while (currL < length) {
//     points.push(x, currL)
//     currL += space
//   }
//
//   const texture = new Two.Texture('https://1.bp.blogspot.com/-xeFv-HuJ7NA/XVHeh8W9GBI/AAAAAAAAL_o/ECPV_3AzeL4tx7w3wF4FpcPtz-oXKhmzwCPcBGAYYCw/s1600/fabric_seamless_light_brown_carpet_texture3.jpg')
//   const line = two.makePath.apply(two, points)
//   // line.noStroke
//   line.stroke = texture
//   line.linewidth = 10
//   texture.scale = 0.1
//
//   // const path = new Two.Path(
//   //
// 	// two.scene.add(line);
//
// //   var leftWall = two.makeRectangle(WALL_WIDTH / 2, two.height/2, WALL_WIDTH, two.height);
//   //texture.scale = 0.125;
//
//   // var rightWall = two.makeRectangle(two.width - WALL_WIDTH / 2, two.height/2, WALL_WIDTH, two.height);
//   // two.bind('update', function() {
//     // rect.rotation += 0.001;
//   // });
//   Player(two)
// }
