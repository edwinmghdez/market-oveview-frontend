<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useMarketStore } from '../store/market';
import { useRouter } from 'vue-router';

  const market = useMarketStore()
  const router = useRouter()

  const handleSearchMarket = async () => {
    await market.search()
  }

  const goToMarketDetail = (id: number) => {
    router.push(`/market/${id}`)
  }

  onMounted(() => {
    handleSearchMarket()
  })

  watch(() => market.query, async (newQuery) => {
    if (newQuery.length > 2 || newQuery.length === 0) {
      await handleSearchMarket()
    }
  })
</script>

<template>
  <div class="relative w-full">
    <input v-model="market.query" type="text" placeholder="Search market..." class="w-full p-4 text-lg bg-gray-800 border border-gray-700 text-white rounded-xl shadow-lg"/>

    <div v-if="market.results.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div v-for="item in market.results" :key="item.id" class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between items-center text-center">
        <div>
          <h4 class="font-bold text-lg mb-2 text-white">{{ item.name }}</h4>
          <p class="text-sm text-gray-400">
            <span class="font-bold">Country:</span> {{ item.country }}
          </p>
          <p class="text-sm text-gray-400">
            <span class="font-bold">Location Type:</span> {{ item.location_type }}
          </p>
        </div>
        <button @click="goToMarketDetail(item.parcl_id)" class="bg-blue-500 p-2 rounded-xl w-full max-w-xs cursor-pointer hover:bg-blue-600 mt-4 text-white font-semibold transition duration-300">More details</button>
      </div>
    </div>

    <div v-if="market.loading" class="text-center text-2xl text-white mt-8">Loading...</div>
    <div v-if="market.error" class="text-center text-red-500 mt-8">{{ market.error }}</div>
  </div>
</template>