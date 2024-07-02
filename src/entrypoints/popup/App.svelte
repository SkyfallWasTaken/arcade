<script lang="ts">
  import "./app.css";
  import Sidebar from "../../lib/sidebar/Sidebar.svelte";
  import TimerPage from "./pages/timer/TimerPage.svelte";
</script>

<div class="bg-base text-text flex w-[400px] h-screen">
  <Sidebar />
  <main class="w-full">
    <TimerPage />
  </main>
</div>
