<script lang="ts">
  import { useConvexClient } from 'convex-svelte';
  import { api } from '../../../convex/_generated/api';
  
  let name = $state('');
  let email = $state('');
  let phone = $state('');
  let isSubmitting = $state(false);
  let message = $state('');
  
  const client = useConvexClient();
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!name || !email) {
      message = 'Name and email are required';
      return;
    }
    
    isSubmitting = true;
    message = '';
    
    try {
      await client.mutation(api.members.create, {
        name,
        email,
        phone: phone || undefined
      });
      
      message = 'Member added successfully!';
      // Reset form
      name = '';
      email = '';
      phone = '';
    } catch (error: any) {
      message = `Error: ${error?.message || 'Failed to add member'}`;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md mx-auto">
    <div class="bg-white rounded-lg shadow-md p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Add New Member</h1>
      
      <form onsubmit={handleSubmit} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            bind:value={name}
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            bind:value={phone}
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Add Member'}
        </button>
        
        {#if message}
          <div class="p-4 rounded-md {message.startsWith('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}">
            {message}
          </div>
        {/if}
      </form>
    </div>
  </div>
</div>