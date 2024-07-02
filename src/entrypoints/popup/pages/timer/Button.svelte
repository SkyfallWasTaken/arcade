<script lang="ts">
  let className = "bg-surface0";
  export let onClick = () => {};
  export { className as class };
</script>

<button class="rounded-full p-2 aspect-square {className}" on:click={onClick}>
  <slot />
</button>
