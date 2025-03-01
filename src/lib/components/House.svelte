<script>
  import { currUser } from '$lib/../stores';
  import Dealer from '$lib/components/Dealer.svelte';
  import Table from './Table.svelte';
  import store from '../../store'

</script>

<div>
  <Table/>
  <Dealer />
</div>

<style>
</style>
