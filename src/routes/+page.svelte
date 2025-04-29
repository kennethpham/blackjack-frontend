<script>
  import { goto } from '$app/navigation';
  import { currUser } from '$lib/../store';
  import { getUser } from '$lib/backend/backend';
  import { onMount } from 'svelte';

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

  onMount(() => {
    if ($currUser.name != '') {
      goto('/User');
    }
  });
</script>

<section class="bg-green-800">
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:h-screen md:h-screen lg:py-0"
  >
    <div
      class="w-full bg-white rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Login to your account
        </h1>
        {#if failed}
          <p class="text-sm text-red-600">
            {'No account with that username...'}
          </p>
        {/if}
        <form
          class="space-y-4 md:space-y-6"
          on:submit={(e) => e.preventDefault()}
        >
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Username</label
            >
            <input
              bind:value={username}
              type="username"
              name="username"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="<username>"
              required
            />
          </div>
          <button
            on:click={(e) => {
              e.preventDefault();
              setCurrUser();
            }}
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:blue-600 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Login</button
          >
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?
            <button
              on:click={() => goto('User/Create')}
              class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Create an Account</button
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
</style>
