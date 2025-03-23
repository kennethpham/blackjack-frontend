<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { currUser } from '../../store';

  onMount(() => {
    if ($currUser.name == '') {
      window.location.assign('/');
    }
  });
</script>

<div class="flex flex-col items-center bg-red m-8">
  <div class="text-white bg-gray-800 rounded-2xl py-3 px-4">
    <h1>User: {$currUser.name}</h1>
    <h1>Wins: {$currUser.wins}</h1>
    <br />
    <button
      class="bg-blue-600 py-2 px-3 rounded-full hover:bg-blue-500 cursor-pointer"
      on:click={() => {
        goto('/Room');
      }}>{'Join Room'}</button
    >
  </div>
</div>

<style>
</style>
