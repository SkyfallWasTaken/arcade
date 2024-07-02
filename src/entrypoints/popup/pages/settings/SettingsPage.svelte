<script>
  import About from "./About.svelte";
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
  <input
    id="apiKey"
    type="password"
    placeholder="Your API key goes here"
    class="px-2 py-1 bg-surface0 text-text rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
  />

  <About />
</div>
