<script>
  import { currUser } from '$lib/../stores';
  import House from '$lib/components/House.svelte';
  import { onMount } from 'svelte';

  /** @type {WebSocket | undefined} */
  let websocket = undefined;

  onMount(() => {
    const ws = new WebSocket('ws://localhost:3000/ws');

    ws.addEventListener('open', (event) => {
      console.log('sending message to server');
      ws.send('Hello from blackjack frontend');
    });

    ws.addEventListener('message', (event) => {
      console.log('message from server: ', event.data);
    });

    ws.addEventListener('close', (event) => {
      console.log('closed websocket with reason: ', event.reason);
    });

    websocket = ws;

    return () => {
      websocket?.close();
    };
  });
</script>

<div>
  <House />
  <button on:click={() => websocket?.send('HELLO FROM CLIENT BUTTON')}
    >{'button'}</button
  >
</div>

<style>
</style>
