<script>
  import { onMount } from 'svelte';

  import store from '$lib/../store';
  import { addUuid, updatePlayers } from '../../features/table/tableSlice';
  import { goto } from '$app/navigation';

  /**
   * @typedef { import('$lib/backend/models').WebSocketMsg } WebsocketMsg
   * @typedef { import('../../features/table/tableSlice').TableStore } TableStore
   */

  /** @type {WebSocket | undefined} */
  let websocket = undefined;

  /** @type {TableStore} */
  let currStore = store.getState().table;

  const onChange = () => {
    currStore = store.getState().table;
  };

  onMount(() => {
    const unsubscribe = store.subscribe(onChange);
    const ws = new WebSocket('ws://localhost:3000/ws');

    ws.addEventListener('open', (event) => {
      console.log('opening websocket connection with backend');
    });

    ws.addEventListener('message', (event) => {
      try {
        /** @type {WebsocketMsg} */
        let serverMsg = JSON.parse(event.data);
        if (serverMsg.msg_type === 'SelfUuid') {
          store.dispatch(addUuid(serverMsg.msg_data_str));
          console.log('updated uuid');
        } else if (serverMsg.msg_type == 'UpdateUserList') {
          store.dispatch(updatePlayers(serverMsg.msg_data_arr));
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
      unsubscribe();
      websocket?.close();
    };
  });

  const startGame = () => {
    goto('/Game');
  };
</script>

<div>
  <h1>Blackjack Waiting Room</h1>
  <p>Users connected: [{currStore.uuidList}]</p>
  <p>User: {currStore.uuid}</p>
  <button on:click={startGame}>{'Start Game'}</button>
</div>

<style>
</style>
