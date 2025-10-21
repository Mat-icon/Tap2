<script>
    let {closeModal, addMember, newMember, isSubmitting} = $props();
</script>
 
 <!-- svelte-ignore a11y_click_events_have_key_events -->
 <!-- svelte-ignore a11y_no_static_element_interactions -->
 <div 
    class="fixed inset-0 bg-black/60 font-heading backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
    onclick={closeModal}
  >
    <div class="bg-white rounded-xl w-full max-w-md transform animate-scale-in" onclick={(e) => e.stopPropagation()}>
      <div class="  px-6 pt-2">
        <h3 class="text-xl xl:text-3xl font-heading1 text-primary tracking-wide">Add New Member</h3>
      </div>
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <form onclick={(e) => e.preventDefault()} class="p-6">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
              Name <span class="text-red-500">*</span>
            </label>
            <input 
              class="w-full px-4 py-3 border-2 border-gray-200 text-sm md:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="Enter full name" 
              bind:value={newMember.name}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input 
              class="w-full px-4 py-3 border-2 border-gray-200 text-sm md:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="email@example.com" 
              type="email" 
              bind:value={newMember.email}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
              Phone
            </label>
            <input 
              class="w-full px-4 py-3 border-2 border-gray-200 text-sm md:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="+1 (555) 000-0000" 
              bind:value={newMember.phone}
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button 
            type="button"
            onclick={closeModal} 
            class="flex-1 px-4 py-2 text-sm md:text-base bg-gray-200 text-primary rounded-md hover:bg-gray-300 transition-all"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          
          <button 
            type="submit"
            onclick={addMember}
            class="flex-1 px-4 py-2 text-sm md:text-base bg-primary text-white rounded-md hover:bg-crimson/80 hover:text-black  transition-all disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  </div>