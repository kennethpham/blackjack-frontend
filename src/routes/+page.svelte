<script>
  import { goto } from '$app/navigation';

  import { currUser } from '$lib/../stores';
  import { getUser } from '$lib/backend/backend';

  let username = '';
  let lastUsername = '';

  let failed = false;

  const setUser = async () => {
    try {
      const user = await getUser(username);
      if (user) {
        currUser.set(user);
        goto('/User');
      } else {
        lastUsername = username;
        failed = true;
      }
    } catch (error) {
      lastUsername = username;
      failed = true;
      console.error(error);
    }
  };
</script>

<div class="container">
  <header>
    <h3>
      <span>Blackjack</span>
    </h3>
  </header>
  {#if failed}
    <p>Failed to login with Username: {lastUsername}</p>
  {/if}
  <div class="form_div">
    <form
      on:submit={(event) => {
        event.preventDefault();
        setUser();
      }}
    >
      <label for="name">Username:</label><br/>
      <input type="text" name="name" bind:value={username} />
      <input
        type="button"
        value="Login"
        on:click={() => {
          setUser();
        }}
      />
    </form>
  </div>
  <button
    on:click={() => {
      goto('/Room');
    }}>{'Continue as Guest'}</button
  >
</div>

<style>
  .container {
    text-align: center;
  }
  .form_div {
    padding: 5px;
  }
</style>
