<script lang="ts">
  import { ApiClient } from "@/lib/api";
  import { apiKey, slackId } from "../../../../lib/settings";

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

<div class="flex flex-col gap-2 p-4">
  <h2 class="text-4xl font-black">History</h2>
  {#if apiClient}
    {#await apiClient?.getUserHistory(slackIdRetrieved) then history}
      {#if history.length > 0}
        <ul class="flex flex-col gap-2">
          {#each history as session}
            <li class="flex flex-col gap-1">
              <p class="text-lg">
                {session.work}
              </p>
              <p class="text-subtext0">
                {session.elapsed} minutes
              </p>
              <p class="text-subtext0">
                <b>Goal:</b>
                {session.goal}
              </p>
            </li>
          {/each}
        </ul>
      {:else}
        <p>No history yet!</p>
      {/if}
    {:catch error}
      <p>Error: {error.message}</p>
    {/await}
  {:else}
    <p>No API client! Have you set the API key and Slack ID in Settings?</p>
  {/if}
</div>
