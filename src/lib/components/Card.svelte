<script>
  /** @type {string} */
  export let val;

  /** @type {string} */
  export let suit;
</script>

<!--
@component
## Card.svelte

  - A component to render SVGs of a desired playing card. SVGs are retrieved
    from server.

### Example

```svelte
<script>
  import Card from '$lib/components/Card.svelte';
</script>

<Card val={'ace'} suit={'spades'} />
```
-->

<div class="card-container">
  <img
    src={`${import.meta.env.VITE_BACKEND_URL}/card/${val}/${suit}`}
    alt={`${val} of ${suit}`}
    width="70"
    height="90"
  />
</div>

<style>
  .card-container {
    float: left;
  }
</style>
