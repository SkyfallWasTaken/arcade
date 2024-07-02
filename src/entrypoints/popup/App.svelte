<script lang="ts">
  import "./app.css";
  import Sidebar from "../../lib/sidebar/Sidebar.svelte";
  import TimerPage from "./pages/timer/TimerPage.svelte";
  import SettingsPage from "./pages/settings/SettingsPage.svelte";

  let page: "timer" | "settings" = "timer";
</script>

<div class="bg-base text-text flex w-[400px] h-screen">
  <Sidebar bind:page />
  <main class="w-full">
    {#if page === "timer"}
      <TimerPage />
    {:else}
      <SettingsPage />
    {/if}
  </main>
</div>
