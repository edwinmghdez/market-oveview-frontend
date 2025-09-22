<script setup lang="ts">
  const series = [
    {
      name: 'Active Users',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'New Registrations',
      data: [11, 32, 45, 32, 34, 52, 41]
    },
    {
      name: 'Other',
      data: [20, 52, 75, 32, 44, 42, 91]
    }
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
    }
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