<script>
  import About from "./About.svelte";
  import { apiKey } from "../../../../lib/settings";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let resolvedApiKey = writable("");
  let loading = true;

  // Subscribe to apiKey and update resolvedApiKey when it changes
  const unsubscribe = apiKey.subscribe(async (value) => {
    resolvedApiKey.set(await value);
    loading = false;
  });

  // Unsubscribe on component destruction
  onDestroy(() => {
    unsubscribe();
  });

  // Function to update the apiKey
  async function updateApiKey(event) {
    const newValue = event.target.value;
    await apiKey.set(newValue);
    resolvedApiKey.set(newValue);
  }
</script>

<div class="flex flex-col gap-2 p-4">
  <h2 class="text-4xl font-black">Settings</h2>

  <label for="apiKey" class="font-medium">
    <p>API Key</p>
    <p class="text-subtext0">
      Ask for an API key in #arcade-help, then come back and put your API key
      here
    </p>
  </label>
  {#if loading}
    <p>Loading...</p>
  {:else}
    <input
      id="apiKey"
      type="password"
      placeholder="Your API key goes here"
      bind:value={$resolvedApiKey}
      on:input={updateApiKey}
      class="px-2 py-1 bg-surface0 text-text rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
    />
  {/if}

  <About />
</div>
