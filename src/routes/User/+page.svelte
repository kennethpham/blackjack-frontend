<script>
  import { initialUser } from '../../store';
  import { goto } from '$app/navigation';
  import { currUser } from '../../store';
</script>

<div>
  {#if $currUser != initialUser}
    <h1>User: {$currUser.name}</h1>
    <h1>Wins: {$currUser.wins}</h1>
    <button
      on:click={() => {
        goto('/Room');
      }}>{'Join Lobby'}</button
    >
  {:else}
    <h1>Error no user set</h1>
    <p>Please Login</p>
    <button on:click={() => goto('/')}>
      {'Login'}
    </button>
  {/if}
</div>

<style>
  :global(body) {
    background-color: #35654d;
  }
</style>
