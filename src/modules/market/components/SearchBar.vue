<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
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

  const totalPages = computed(() => {
    if (market.totalItems === 0) return 1
    return Math.ceil(market.totalItems/market.pageSize)
  })

  const pages = computed(() => {
    const pagesArray = [];
    const startPage = Math.max(1, market.currentPage - 2);
    const endPage = Math.min(totalPages.value, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  });

  watch(() => market.query, (newQuery) => {
    market.currentPage = 1;
    if (newQuery.length > 2 || newQuery.length === 0) {
      handleSearchMarket();
    }
  });
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

    <div v-if="totalPages > 1 && !market.loading"
      class="flex justify-center items-center mt-6 space-x-2"
    >
      <button
        @click="market.changePage(market.currentPage - 1)"
        :disabled="market.currentPage === 1"
        class="w-20 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
      >
        Previous
      </button>

      <button
        v-for="page in pages"
        :key="page"
        @click="market.changePage(page)"
        :class="{
          'w-10 bg-blue-500 text-white hover:cursor-pointer': market.currentPage === page,
          'w-10 bg-gray-800 text-white hover:bg-gray-700 hover:cursor-pointer' : market.currentPage !== page,
        }"
        class="p-2 rounded-lg transition duration-300"
      >
        {{ page }}
      </button>

      <button
        @click="market.changePage(market.currentPage + 1)"
        :disabled="market.currentPage === totalPages"
        class="w-20 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
      >
        Next
      </button>
    </div>

    <div v-if="market.loading" class="text-center text-2xl text-white mt-8">Loading...</div>
    <div v-if="market.error" class="text-center text-red-500 mt-8">{{ market.error }}</div>
  </div>
</template>