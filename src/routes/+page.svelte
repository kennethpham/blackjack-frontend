<script>
  import { goto } from '$app/navigation';
  import { currUser } from '$lib/../store';
  import { getUser, addUser } from '$lib/backend/backend';

  let username = '';
  let lastUsername = '';

  let failed = false;

  const setCurrUser = async () => {
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

  const createUser = async () => {
    try {
      const user = await addUser(username);
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
    <p>Failed with Username: {lastUsername}</p>
  {/if}
  <div class="form_div">
    <form
      on:submit={(event) => {
        event.preventDefault();
        setCurrUser();
      }}
    >
      <label for="name">Username:</label><br />
      <input type="text" name="name" bind:value={username} />
      <input
        type="button"
        value="Login"
        on:click={() => {
          setCurrUser();
        }}
      />
    </form>
  </div>
  <button
    on:click={() => {
      createUser();
    }}>{'Add User'}</button
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
