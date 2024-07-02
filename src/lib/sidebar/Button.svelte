<script lang="ts">
  export let onClick = () => {};
</script>

<button
  class="hover:bg-overlay0 flex aspect-square justify-center items-center transition"
  on:click={onClick}
>
  <slot />
</button>
