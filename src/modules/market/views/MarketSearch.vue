<script setup lang="ts">
  import SearchBar from '../components/SearchBar.vue';
</script>

<template>
  <div class="p-4 sm:p-8 md:p-12 lg:p-16 text-white min-h-screen bg-gray-900">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col items-center justify-center pt-20">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">Search Market</h2>
        <SearchBar />
      </div>
    </div>
  </div>
</template>