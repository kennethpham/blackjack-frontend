<script>
  import { goto } from '$app/navigation';

  import { currUser, initialUser } from '$lib/../stores';
</script>

{#if $currUser !== initialUser}
  <div>
    <h1>Uuid: {$currUser._id}</h1>
    <h1>User: {$currUser.name}</h1>
    <h1>Wins: {$currUser.wins}</h1>
    <button
      on:click={() => {
        goto('/Room');
      }}>Start Game</button
    >
  </div>
{:else}
  <h1>Error no user set</h1>
  <p>Please Login</p>
{/if}

<style>
  :global(body) {
    background-color: #35654d;
  }
</style>
