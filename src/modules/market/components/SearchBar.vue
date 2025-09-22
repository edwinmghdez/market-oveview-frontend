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
  <div class="relative w-full p-20">
    <input v-model="market.query" type="text" placeholder="Search market..." class="w-full p-4 text-lg bg-white border rounded-xl shadow"/>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 w-7xl mx-auto">
      <div v-for="item in market.results" :key="item.id" class="bg-white border rounded-xl h-auto mt-2 text-center pt-5 pb-5">
        {{ item.name }}
        <p class="font-bold">Country:</p>
        {{ item.country }}
        <p class="font-bold">Location Type:</p>
        {{ item.location_type }}
        <br/>
        <button @click="goToMarketDetail(item.parcl_id)" class="bg-blue-500 p-2 rounded-xl w-60 cursor-pointer hover:bg-blue-600 mt-10">More details</button>
      </div>
    </div>
    <div v-if="market.loading" class="text-center text-2xl text-white mt-2">Loading...</div>
    <div v-if="market.error">{{ market.error }}</div>
  </div>
</template>