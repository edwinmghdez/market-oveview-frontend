<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useMarketStore } from '../store/market';


  const market = useMarketStore()

  const props = defineProps<{
    id: number
  }>()

  const handleHousingCounts = async () => {
    await market.housingCounts(props.id)
  }

  onMounted(async () => {
    await handleHousingCounts()
  })

  const items = computed(() => {
    const data = market.housingCountsResults
    return Array.isArray(data?.items) ? data.items : []
  })

  const dates = computed(() => {
    return items.value.map(item => item.date)
  })

  const sales = computed(() => {
    return items.value.map(item => item.sales)
  })

  const new_listings_for_sale = computed(() => {
    return items.value.map(item => item.new_listings_for_sale)
  })

  const new_rental_listings = computed(() => {
    return items.value.map(item => item.new_rental_listings)
  })

  const series = [
    {
      name: 'Sales',
      data: sales.value,
    },
    {
      name: 'New Listings For Sale',
      data: new_listings_for_sale.value
    },
    {
      name: 'New Rental Listings',
      data: new_rental_listings.value
    }
  ]

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false }
    },
    stroke: { curve: 'smooth' },
    xaxis: {
      categories: dates.value,
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
    legend: {
      labels: {
        colors: '#ffffff',
      },
    }
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