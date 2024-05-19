<script>
  import { currUser } from '$lib/../stores';
  import { currHands } from '$lib/../stores';
  import Hand from '$lib/components/Hand.svelte';
</script>

<div class="dealer-container">
  <p>DEALER's Hand:</p>
  {#each $currHands as hand}
    <Hand {hand} />
  {/each}
</div>

<style>

</style>
