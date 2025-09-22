<script setup lang="ts">
import { onMounted } from 'vue';
import { useMarketStore } from '../store/market';

  const market = useMarketStore()

  const props = defineProps<{
    id: number
  }>()

  const handleHousingPrices = async () => {
    await market.housingPrices(props.id)
  }

  onMounted(() => {
    handleHousingPrices()
    console.log(market.housingPricesResults)
  })

  const series = [
    {
      name: 'Median Price',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
  ]

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false }
    },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    dataLabels: {
      style: {
        colors: ['#ffffff', '#ffffff', '#ffffff']
      }
    },
    markers: {
      colors: ['#ffffff', '#ffffff', '#ffffff']
    },
  }
</script>

<template>
  <div class="w-3xl">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>