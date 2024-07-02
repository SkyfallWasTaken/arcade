<script lang="ts">
  import "./app.css";
  import Sidebar from "../../lib/sidebar/Sidebar.svelte";
  import TimerPage from "./pages/timer/TimerPage.svelte";
  import SettingsPage from "./pages/settings/SettingsPage.svelte";
  import HistoryPage from "./pages/history/HistoryPage.svelte";

  let page: "timer" | "settings" | "history" = "timer";
</script>

<div class="bg-base text-text flex w-[400px] h-screen">
  <Sidebar bind:page />
  <main class="w-full h-screen">
    {#if page === "timer"}
      <TimerPage />
    {:else if page === "settings"}
      <SettingsPage />
    {:else if page === "history"}
      <HistoryPage />
    {/if}
  </main>
</div>
