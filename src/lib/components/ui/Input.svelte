<script>
  export let type = 'text';
  export let placeholder = '';
  export let value = '';
  export let label = '';
  export let required = false;

  let inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="mb-4">
  {#if label}
    <label for={inputId} class="block text-gray-700 text-sm font-medium mb-1">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  <input
    id={inputId}
    {type}
    {placeholder}
    {required}
    bind:value
    class="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
  />
</div>
