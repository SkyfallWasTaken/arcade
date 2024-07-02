<script>
  import { Play } from "lucide-svelte";
  import Button from "./Button.svelte";
</script>

<div class="flex flex-col gap-2 py-4 justify-center items-center">
  <h1 class="text-3xl font-bold shadow-sm">Timer</h1>

  <h2 class="text-6xl font-black">00:00</h2>

  <div class="flex gap-2">
    <Button class="text-mantle bg-green">
      <Play size="1.5rem" />
    </Button>
  </div>
</div>
