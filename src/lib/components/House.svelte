<script>
  import { currUser } from '$lib/../stores';
  import Dealer from '$lib/components/Dealer.svelte';
  import Table from './Table.svelte';
</script>

<div>
  <p>User: {$currUser.name}</p>

  <Table/>
  <Dealer />
</div>

<style>
</style>
