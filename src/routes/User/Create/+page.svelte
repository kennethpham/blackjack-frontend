<script>
  import { goto } from '$app/navigation';
  import { currUser } from '$lib/../store';
  import { getUser, addUser } from '$lib/backend/backend';
  import { onMount } from 'svelte';

  let username = '';
  let failed = false;

  const createUser = async () => {
    try {
      const user = await addUser(username);
      if (user) {
        currUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
        goto('/User');
      } else {
        failed = true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  onMount(() => {
    if ($currUser.name != '') {
      goto('/User');
    }
  });
</script>

<section class="bg-green-900 dark:bg-green-800">
  <div
    class="flex flex-col items-center bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
    hidden={!failed}
  >
    <strong class="font-bold">Error Creating Account!</strong>
    <span class="text-red block sm:inline">Try a new username</span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3"> </span>
  </div>
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:h-screen md:h-screen lg:py-0"
  >
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Create an Account
        </h1>
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
              id="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="<username>"
              required
            />
          </div>
          <button
            on:click={(e) => {
              e.preventDefault();
              createUser();
            }}
            type="submit"
            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:blue-600 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Create Account</button
          >
        </form>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Have an account?
          <button
            on:click={() => window.location.assign('/')}
            class="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Login Here</button
          >
        </p>
      </div>
    </div>
  </div>
</section>

<style>
</style>
