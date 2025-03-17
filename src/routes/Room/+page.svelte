<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { currUser, initialUser } from '$lib/../store';

  /**
   * @typedef { import('$lib/backend/models').WebSocketMsg } WebsocketMsg
   */

  /** @type {WebSocket | undefined} */
  let websocket = undefined;

  let table = [];

  onMount(() => {
    if ($currUser != initialUser) {
      const ws = new WebSocket(`ws://localhost:8080/ws/${$currUser._id}`);

      ws.addEventListener('open', (event) => {
        console.log('opening websocket connection with backend');
      });

      ws.addEventListener('message', (event) => {
        try {
          /** @type {WebsocketMsg} */
          let serverMsg = JSON.parse(event.data);
          if (serverMsg.msg_type === 'SelfUuid') {
            console.log('updated uuid');
          } else if (serverMsg.msg_type == 'UpdateUserList') {
            table = serverMsg.msg_data_keys;
          }
        } catch (err) {
          console.log(err);
        }
        console.log('message from server: ', event.data);
      });

      ws.addEventListener('close', (event) => {
        console.log('closed websocket with reason: ', event.reason);
      });

      websocket = ws;

      return () => {
        websocket?.close();
      };
    }
  });

  const startGame = () => {
    goto('/Game');
  };
</script>

<div>
  {#if $currUser != initialUser}
    <h1>Blackjack Waiting Room</h1>
    <p>Users connected: [{table.map(([username, _]) => username)}]</p>
    <p>User: {$currUser.name}</p>
    <button on:click={startGame}>{'Start Game'}</button>
  {:else}
    <h1>Error no user set</h1>
    <p>Please Login</p>
    <button on:click={() => goto('/')}>
      {'Login'}
    </button>
  {/if}
</div>

<style>
</style>
