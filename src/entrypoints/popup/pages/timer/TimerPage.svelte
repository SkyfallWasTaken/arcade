<script lang="ts">
  import { Pause, Play } from "lucide-svelte";
  import Button from "./Button.svelte";
  import { ApiClient } from "../../../../lib/api";
  import { slackId, apiKey } from "../../../../lib/settings";
  import { secondsToMMSS } from "../../../../lib/util";

  let slackIdRetrieved: string | null;
  let apiKeyRetrieved: string | null;

  onMount(async () => {
    slackIdRetrieved = await slackId.get();
    apiKeyRetrieved = await apiKey.get();
  });

  let apiClient: ApiClient | null = null;
  $: {
    if (slackIdRetrieved) {
      apiClient = new ApiClient(apiKeyRetrieved);
    }
  }
</script>

<div class="flex flex-col gap-2 py-4 justify-center items-center">
  <h1 class="text-3xl font-bold shadow-sm">Timer</h1>

  {#if apiClient}
    {#await apiClient?.getLatestUserSession(slackIdRetrieved)}
      <p class="text-lg">Loading...</p>
    {:then session}
      <h2 class="text-5xl font-black">
        {session?.remaining} minutes
      </h2>

      <i class="text-lg">{session?.work}</i>
      <i class="text-lg"><b>Goal:</b> {session?.goal}</i>

      <div class="flex gap-2 my-2">
        <Button
          class="text-mantle {session?.paused ? 'bg-green' : 'bg-surface0'}"
          onClick={() => {
            apiClient?.togglePauseUserSession(slackIdRetrieved);
          }}
        >
          {#if session?.paused}
            <Play size="1.5rem" />
          {:else}
            <Pause size="1.5rem" />
          {/if}
        </Button>
      </div>
    {/await}
  {/if}
</div>
