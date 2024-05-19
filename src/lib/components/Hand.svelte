<script>
  import Card from '$lib/components/Card.svelte';

  /**
   * @typedef { import('$lib/components/Card').Card } Card
   * @typedef { import('$lib/components/Hand').Hand } Hand
   */

  /** @type {Hand} */
  export let hand;
</script>

<!--
@component
## Hand.svelte

  - A component to render the Hand of a player.

### Example

```svelte
<script>
  import Hand from '$lib/components/Hand.svelte';

  let currHand = [{ users: { _id: 'id', name: 'test', wins: 1 },
    cards: { value: 'ace', suit: 'hearts'}]
</script>

<Hand hand={currHand} />
```
-->

<div class="hand-container">
  {#each hand.cards as card}
    <Card val={card.value} suit={card.suit} />
  {/each}
</div>

<style>
  .hand-container {
    display: inline-block;
  }
</style>
