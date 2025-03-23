<script>
  import '../app.css';
  import { currUser, initialUser } from '../store';

  const logout = () => {
    currUser.set(initialUser);
    window.location.assign('/');
  };
</script>

<div>
  {#if $currUser.name != ''}
    <nav class="flex p-5 justify-between">
      <p class="text-white bg-gray-800 rounded-full py-2 px-3">
        {`Logged in as: ${$currUser.name}`}
      </p>
      <p class="text-white bg-gray-800 rounded-full py-2 px-3">Blackjack</p>
      <button
        class="text-white text-sm bg-gray-900 hover:bg-gray-700 rounded-full cursor-pointer"
        on:click={logout}
      >
        <p class="py-2 px-3">Logout</p>
      </button>
    </nav>
  {/if}
  <slot />
</div>

<style>
  :global(body) {
    background-color: var(--color-green-800);
  }
</style>
