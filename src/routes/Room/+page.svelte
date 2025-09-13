<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { currUser } from '$lib/../store';

  /**
   * @typedef { import('$lib/backend/models').WebSocketMsg } WebsocketMsg
   */

  /** @type {WebSocket | undefined} */
  let websocket = undefined;

  let table = [];

  onMount(() => {
    if ($currUser.name) {
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

<div class="flex-col text-white p-6">
  <div class="bg-gray-800 p-3 rounded-xl">
    <div class="flex justify-center items-center pb-10">
      <h1 class="font-bold text-2xl">Blackjack Waiting Room</h1>
    </div>
    <p>Users connected: [{table.map(([username, _]) => username)}]</p>
    <p>User: {$currUser.name}</p>
    <div class="pt-5">
      <button
        class="bg-red-800 rounded-full px-3 py-2 cursor-pointer hover:bg-red-900"
        on:click={() => goto('/User')}>{'Leave Room'}</button
      >
    </div>
    <div class="flex justify-center items-center">
      <button
        class="bg-blue-600 px-3 py-2 rounded-full hover:bg-blue-700 focus:border-gray-900 border-blue-600 border"
        on:click={startGame}>{'Start Game'}</button
      >
    </div>
  </div>
</div>

<style>
</style>
