<script lang="ts">
  let { closeModal, selectedMembers = [], deleteMembers, isSubmitting } = $props();

  // Escape closes modal
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };

  // Add Escape listener globally
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleEscape);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
  onclick={closeModal}
>
  <div
    class="bg-white rounded-xl w-full max-w-md transform animate-scale-in"
    onclick={(e) => e.stopPropagation()}
  >
    <div class="pt-4 px-6">
      <h3 class="text-xl md:text-4xl font-heading1 text-black">Confirm Delete</h3>
    </div>

    <div class="p-6 font-heading">
      <div class="flex items-center gap-4 mb-6">
        <div class="bg-red-100 rounded-full p-3">
          <svg
            class="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <p class="text-primary font-medium">
            Are you sure you want to delete
            <span class="font-bold text-red-600">{selectedMembers.length}</span>
            member{selectedMembers.length > 1 ? "s" : ""}?
          </p>
          <p class="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
        </div>
      </div>

      <div class="flex gap-3 font-heading">
        <button
          onclick={closeModal}
          class="flex-1 px-4 py-2 text-sm md:text-base bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-all font-semibold"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          onclick={deleteMembers}
          class="flex-1 px-4 py-2 text-sm md:text-base bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-lg disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
</div>
