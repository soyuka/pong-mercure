<script>
  import { onMount } from 'svelte'
  import Game from './Game'

  const TOPIC = 'https://pong.dev/game'
  const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOltdfX0.Q67FiWV2tFlMcOe69Az7OfO_GxD2oVa_A0EE3uCpR88'
  const HUB_URL = 'http://91.121.144.105:8081/hub'
  const MAX_SCORE = 10

  const headers = new Headers()
  headers.append('Authorization', 'Bearer '+TOKEN)
  headers.append('Content-Type', 'application/x-www-form-urlencoded')

  let left = 0
  let right = 0
  let displayLeft = 0
  let displayRight = 0
  let done = false

  const gameOptions = {
    gravity: 9.0,
    mass: 3.0,
    stiffness: 0.20,
    damping: 0.7
  }

  const game = Game(gameOptions)

  function isDone() {
    const diff = right - left

    if (Math.abs(diff) < MAX_SCORE) {
      return false
    }

    if (diff < 0) {
      // left wins
      done = 'left'
      return
    }

    // right wins
    done = 'right'
  }

  async function App() {
    game.init()
    const url = new URL(HUB_URL)
    url.searchParams.append('topic', TOPIC)

    const ee = new EventSource(url)
    ee.onmessage = (message) => {
      const body = JSON.parse(message.data)
      if (body.update === 'left') {
        left++
      } else if (body.update === 'right') {
        right++
      }

      if (false === isDone()) {
        displayLeft = left
        displayRight = right
      }
    }
  }

  function resetGame() {
     game.reset()
     game.init(gameOptions)
  }

  onMount(App);

  async function handleKeydown(event) {
    if (done !== false) {
      return
    }

    const data = new URLSearchParams()
    data.set('topic', TOPIC)

    if (event.key === 'ArrowLeft') {
      data.set('data', JSON.stringify({update: 'left'}))
    } else if (event.key === 'ArrowRight') {
      data.set('data', JSON.stringify({update: 'right'}))
    } else {
      return
    }

    const body = data.toString()
    headers.set('Content-Length', body.length)
    await fetch(HUB_URL, {method: 'POST', body, headers})
  }
</script>

<style>
</style>

<!-- <h1>Points {displayLeft} {displayRight}!</h1> -->
<!-- {#if done} -->
<!--   Done, team {done} wins! -->
<!-- {/if} -->

<label>
  Gravity:
  <input type=text bind:value={gameOptions.gravity} on:change={resetGame}>
	<input type=range bind:value={gameOptions.gravity} on:change={resetGame}>
</label>
<label>
  Stiffness:
  <input type=text bind:value={gameOptions.stiffness} on:change={resetGame}>
	<input type=range bind:value={gameOptions.stiffness} on:change={resetGame}>
</label>
<label>
  Mass:
  <input type=text bind:value={gameOptions.mass} on:change={resetGame}>
	<input type=range bind:value={gameOptions.mass} on:change={resetGame}>
</label>
<label>
  Damping:
  <input type=text bind:value={gameOptions.damping} on:change={resetGame}>
	<input type=range bind:value={gameOptions.damping} on:change={resetGame}>
</label>
<svelte:window on:keydown={handleKeydown}/>
