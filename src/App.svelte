<script>
  import { onMount } from 'svelte'
  import uuid from 'uuid'

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

  onMount(App);

  async function handleKeydown(event) {
    if (done !== false) {
      return
    }

    const data = new URLSearchParams()
    data.set('topic', TOPIC)

    if (event.key === 'ArrowLeft') {
      left++
      data.set('data', JSON.stringify({update: 'left'}))
    } else if (event.key === 'ArrowRight') {
      right++
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

<h1>Points {displayLeft} {displayRight}!</h1>
{#if done}
  Done, team {done} wins!
{/if}

<svelte:window on:keydown={handleKeydown}/>
