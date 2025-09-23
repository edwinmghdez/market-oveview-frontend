<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useMarketStore } from '../store/market';

  const market = useMarketStore()

  const props = defineProps<{
    id: number
  }>()

  const handleHousingPrices = async () => {
    await market.housingPrices(props.id)
  }

  onMounted(async () => {
    await handleHousingPrices()
  })

  const items = computed(() => {
    const data = market.housingPricesResults
    return Array.isArray(data?.items) ? data.items : []
  })

  const series = computed(() => [
    {
      name: 'Median Price',
      data: items.value.map(item => item.price.median.sales)
    },
  ])

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false }
    },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: items.value.map(item => item.date),
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px',
        color: '#000000',
      },
    },
  }
</script>

<template>
  <div>
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>