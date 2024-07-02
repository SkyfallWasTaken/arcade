<script lang="ts">
  import { Settings, Timer } from "lucide-svelte";
  import Button from "./Button.svelte";
  export let page: "timer" | "settings" = "timer";
</script>

<div class="bg-surface0 w-[4rem] h-full flex flex-col">
  <Button onClick={() => (page = "timer")}>
    <Timer size="1.5rem" />
  </Button>
  <Button onClick={() => (page = "settings")}>
    <Settings size="1.5rem" />
  </Button>
</div>
