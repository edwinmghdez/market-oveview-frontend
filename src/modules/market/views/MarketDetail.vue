<script setup lang="ts">
  import ChartMedianPrice from '../components/ChartMedianPrice.vue';
  import ChartActivityInventory from '../components/ChartActivityInventory.vue';
  import { useRoute } from 'vue-router';
  import { useMarketStore } from '../store/market';
  import { computed, onMounted } from 'vue';

  const market = useMarketStore()
  const route = useRoute()
  const marketId = route.params.id

  const handleHousingPrices = async () => {
    await market.housingPrices(marketId)
  }

  onMounted(async () => {
    await handleHousingPrices()
  })

  const items = computed(() => {
    const data = market.housingPricesResults
    return Array.isArray(data?.items) ? data.items : []
  })

  const price = computed(() => {
    return items.value.map(item => item.price.median.sales)
  })

  const pricePerSquareFoot = computed(() => {
    return items.value.map(item => item.price_per_square_foot.median.sales)
  })
</script>

<template>
  <div class="p-4 sm:p-8 md:p-12 lg:p-16 text-white min-h-screen bg-gray-900">
    <div class="max-w-7xl mx-auto">
      <header class="text-center mb-10">
        <h2 class="font-bold text-3xl sm:text-4xl text-white">Market Overview</h2>
        <div class="mt-4 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="flex flex-col items-center">
              <span class="font-semibold text-lg text-gray-400">Market:</span>
              <span class="text-xl font-bold mt-1">{{ market.housingPricesResults.parcl_id }}</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="font-semibold text-lg text-gray-400">Median $/ft² (sales):</span>
              <span class="text-xl font-bold mt-1 text-green-400">$ {{ pricePerSquareFoot[0] }}</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="font-semibold text-lg text-gray-400">Median sale (latest):</span>
              <span class="text-xl font-bold mt-1 text-green-400">$ {{ price[0] }}</span>
            </div>
            <div class="flex flex-col items-center">
              <span class="font-semibold text-lg text-gray-400">Sales (last month):</span>
              <span class="text-xl font-bold mt-1 text-green-400">{{ price[0] }}</span>
            </div>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 class="text-xl font-semibold mb-4 text-white">Median Sale Price (trend)</h3>
          <ChartMedianPrice :id="marketId" />
        </div>

        <div class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h3 class="text-xl font-semibold mb-4 text-white">Market Activity & Inventory</h3>
          <ChartActivityInventory :id="marketId" />
        </div>
      </div>
    </div>
  </div>
</template>