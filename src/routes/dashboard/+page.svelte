<script lang="ts">
  import { onMount } from 'svelte';
  import { useConvexClient } from 'convex-svelte';
  import { api } from '../../../convex/_generated/api';
  import { Edit2, PlusSquare, Trash2 } from 'lucide-svelte';
  import Button from '$lib/components/ui/Button.svelte';
  import AddModal from '$lib/components/modals/AddModal.svelte';
  import EditModal from '$lib/components/modals/EditModal.svelte';
  import DeleteModal from '$lib/components/modals/DeleteModal.svelte';
  import type { Id } from '../../../convex/_generated/dataModel';

  interface Member {
  _id: Id<"members">;
  name: string;
  email: string;
  phone?: string;
}

  let members: Member[] = [];
  let selectedMembers: Id<"members">[] = [];
  let isLoading = true;

  let showAddModal = false;
  let showEditModal = false;
  let showDeleteModal = false;
  let isSubmitting = false;

  let message = '';
  let messageType: 'success' | 'error' = 'success';
  let showMessage = false;

  let editMemberData: any = { id: '', name: '', email: '', phone: '' };
  let newMember = { name: '', email: '', phone: '' };

  const client = useConvexClient();

  async function loadMembers() {
    isLoading = true;
    try {
      members = await client.query(api.members.list, {});
      selectedMembers = [];
    } catch (err: any) {
      showToast(`Error loading members: ${err.message}`, 'error');
    } finally {
      isLoading = false;
    }
  }

  onMount(loadMembers);

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    message = msg;
    messageType = type;
    showMessage = true;
    setTimeout(() => showMessage = false, 3000);
  }

  // Add member
  async function addMember() {
    if (!newMember.name?.trim() || !newMember.email?.trim()) {
      showToast('Name and email are required', 'error');
      return;
    }
    
    isSubmitting = true;
    try {
      await client.mutation(api.members.create, {
        name: newMember.name.trim(),
        email: newMember.email.trim(),
        phone: newMember.phone?.trim() || undefined,
      });
      showToast('Member added successfully!', 'success');
      newMember = { name: '', email: '', phone: '' };
      showAddModal = false;
      await loadMembers();
    } catch (err: any) {
      showToast(`Failed to add member: ${err.message}`, 'error');
    } finally {
      isSubmitting = false;
    }
  }


  async function updateMember() {
    if (!editMemberData.name?.trim() || !editMemberData.email?.trim()) {
      showToast('Name and email are required', 'error');
      return;
    }
    
    isSubmitting = true;
    try {
      await client.mutation(api.members.update, {
        id: editMemberData.id,
        name: editMemberData.name.trim(),
        email: editMemberData.email.trim(),
        phone: editMemberData.phone?.trim() || undefined,
      });
      showToast('Member updated successfully!', 'success');
      showEditModal = false;
      await loadMembers();
    } catch (err: any) {
      showToast(`Failed to update member: ${err.message}`, 'error');
    } finally {
      isSubmitting = false;
    }
  }

  async function deleteMembers() {
    if (selectedMembers.length === 0) return;
    
    isSubmitting = true;
    try {
      await Promise.all(
        selectedMembers.map(id => client.mutation(api.members.remove, { id }))
      );
      showToast(`${selectedMembers.length} member(s) deleted successfully!`, 'success');
      showDeleteModal = false;
      await loadMembers();
    } catch (err: any) {
      showToast(`Failed to delete member(s): ${err.message}`, 'error');
    } finally {
      isSubmitting = false;
    }
  }

  function openEditModal(member : any) {
    editMemberData = { 
      id: member._id, 
      name: member.name, 
      email: member.email, 
      phone: member.phone || '' 
    };
    showEditModal = true;
  }

  function toggleSelect(id: Id<"members">) {
    if (selectedMembers.includes(id)) {
      selectedMembers = selectedMembers.filter(i => i !== id);
    } else {
      selectedMembers = [...selectedMembers, id];
    }
  }

  function toggleSelectAll(checked: boolean) {
    selectedMembers = checked ? members.map(m => m._id) : [];
  }

  function isSelected(id : Id<"members">) {
    return selectedMembers.includes(id);
  }

  function closeModal() {
    showAddModal = false;
    showEditModal = false;
    showDeleteModal = false;
  }

  $: allSelected = members.length > 0 && selectedMembers.length === members.length;
  $: someSelected = selectedMembers.length > 0 && selectedMembers.length < members.length;
  $: totalMembers = members.length;
  $: membersWithPhone = members.filter(m => m.phone).length;
  $: selectedCount = selectedMembers.length;
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <!-- Toast Notification -->
  {#if showMessage}
  <div class="fixed top-6 right-6 z-[60] animate-slide-in">
    <div class="px-6 py-6 rounded-md {messageType === 'success' ? 'border bg-[whitesmoke] border-primary text-black' : 'bg-gradient-to-r from-red-500 to-red-600 text-white'}   font-heading font-medium">
      <div class="flex items-center gap-2">
        {#if messageType === 'success'}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 13l4 4L19 7"></path>
          </svg>
        {:else}
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        {/if}
        {message}
      </div>
    </div>
  </div>
  {/if}

  <div class="max-w-6xl mt-16 mx-auto font-heading">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl xl:text-4xl  text-gray-800 font-heading1 mb-2">Members Management</h1>
      <p class="text-gray-500 text-sm md:text-base">Manage your organization's members efficiently</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <!-- Total Members Card -->
      <div class="bg-white rounded-xl border border-primary/10 py-8 px-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs md:text-sm font-medium text-primary uppercase tracking-wide">Total Members</p>
            <p class="text-4xl md:text-5xl font-heading1 text-primary mt-2">{totalMembers}</p>
          </div>
          <div class="bg-primary/10 rounded-xl p-2">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Members with Phone Card -->
      <div class="bg-white rounded-xl p-6   border border-primary/10">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs md:text-sm font-medium text-primary uppercase tracking-wide">With Phone</p>
            <p class="text-4xl md:text-5xl  font-heading1 text-primary mt-2">{membersWithPhone}</p>
          </div>
          <div class="bg-primary/10 rounded-xl p-2">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Selected Members Card -->
      <div class="bg-white rounded-xl p-6 border border-primary/10">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs md:text-sm font-medium text-primary uppercase tracking-wide">Selected</p>
            <p class="text-4xl md:text-5xl   text-primary font-heading1 mt-2">{selectedCount}</p>
          </div>
          <div class="bg-primary/10 rounded-xl p-2">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Table Card -->
    <div class="bg-white rounded-xl border border-primary/10 overflow-hidden">
      <div class="p-6 ">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 class="text-xl font-semibold tracking-tight text-primary">Members Directory</h2>
          
<div class="flex flex-col md:flex-row gap-3">
  <Button
    onClick={() => (showAddModal = true)}
    icon={PlusSquare}
    title="Add Member"
    class="bg-primary hover:bg-crimson/80 hover:text-black text-white h-13 md:h-12 w-60 md:w-40"
  />

  <Button
    onClick={() => (showDeleteModal = true)}
    icon={Trash2}
    title={`Delete (${selectedMembers.length})`}
    class="bg-red-500 hover:bg-red-600 h-13 md:h-12 w-60 md:w-40 text-white"
    disabled={selectedMembers.length === 0}
  />
</div>

        </div>
      </div>

      <div class="overflow-x-auto">
        {#if isLoading}
          <div class="text-center py-16">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
            <p class="mt-4 text-gray-600 font-medium">Loading members...</p>
          </div>
        {:else}
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={allSelected}
                    indeterminate={someSelected}
                    onchange={e => toggleSelectAll(e.currentTarget.checked)}
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-5 h-5 cursor-pointer"
                  />
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phone</th>
                <th class="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each members as member (member._id)}
                <tr class="{isSelected(member._id) ? 'bg-blue-50' : ''} hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={isSelected(member._id)} 
                      onchange={() => toggleSelect(member._id)}
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-5 h-5 cursor-pointer"
                    />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10 bg-crimson rounded-md flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{member.email}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{member.phone || '-'}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <Button
                      onClick={() => openEditModal(member)} 
                      icon={Edit2}
                      class="bg-primary hover:bg-crimson/80 hover:text-black w-30 text-white"
                     title="Edit"
                     />
                  </td>
                </tr>
              {/each}
              {#if members.length === 0}
                <tr>
                  <td colspan="5" class="px-6 py-16 text-center">
                    <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    <p class="mt-4 text-gray-500 text-lg font-medium">No members found</p>
                    <p class="text-gray-400">Click "Add Member" to get started</p>
                  </td>
                </tr>
              {/if}
            </tbody>
          </table>
        {/if}
      </div>
    </div>
  </div>

  <!-- Add Member Modal -->
  {#if showAddModal}
 <AddModal 
    {closeModal} 
    {addMember} 
    {newMember} 
    {isSubmitting} />

  {/if}

  <!-- Edit Member Modal -->
  {#if showEditModal}
    <EditModal 
      {closeModal} 
      {editMemberData} 
      {updateMember} 
      {isSubmitting} />
  {/if}

  <!-- Delete Confirmation Modal -->
  {#if showDeleteModal}
  <DeleteModal 
      {closeModal} 
      {selectedMembers} 
      {deleteMembers} 
      {isSubmitting} />

  {/if}
</div>


