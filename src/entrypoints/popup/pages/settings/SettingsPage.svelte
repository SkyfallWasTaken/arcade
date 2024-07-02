<script>
  import About from "./About.svelte";
  import { apiKey, slackId } from "../../../../lib/settings";
  import { writable } from "svelte/store";

  let resolvedApiKey = writable("");
  let resolvedSlackId = writable("");

  let loadingApiKey = true;
  let loadingSlackId = true;

  const unsubscribeApiKey = apiKey.subscribe(async (value) => {
    resolvedApiKey.set(await value);
    loadingApiKey = false;
  });
  const unsubscribeSlackId = slackId.subscribe(async (value) => {
    resolvedSlackId.set(await value);
    loadingSlackId = false;
  });

  // Unsubscribe on component destruction
  onDestroy(() => {
    unsubscribeApiKey();
    unsubscribeSlackId();
  });

  async function updateApiKey(event) {
    const newValue = event.target.value;
    await apiKey.set(newValue);
    resolvedApiKey.set(newValue);
  }
  async function updateSlackId(event) {
    const newValue = event.target.value;
    await slackId.set(newValue);
    resolvedSlackId.set(newValue);
  }
</script>

<div class="flex flex-col gap-2 p-4">
  <h2 class="text-4xl font-black">Settings</h2>

  <div>
    <label for="apiKey" class="font-medium">
      <p>API Key</p>
      <p class="text-subtext0">
        Ask for an API key in #arcade-help, then come back and put your API key
        here
      </p>
    </label>
    {#if loadingApiKey}
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
  </div>

  <div>
    <label for="apiKey" class="font-medium">
      <p>Slack ID</p>
      <p class="text-subtext0">
        Send a message in #what-is-my-slack-id, then come back and put your ID
        here.
      </p>
    </label>
    {#if loadingSlackId}
      <p>Loading...</p>
    {:else}
      <input
        id="slackId"
        type="text"
        placeholder="Your Slack ID goes here"
        bind:value={$resolvedSlackId}
        on:input={updateSlackId}
        class="px-2 py-1 bg-surface0 text-text rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      />
    {/if}
  </div>

  <About />
</div>
