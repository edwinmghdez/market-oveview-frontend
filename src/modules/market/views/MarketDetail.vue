<script setup lang="ts">
  import ChartMedianPrice from '../components/ChartMedianPrice.vue';
  import ChartActivityInventory from '../components/ChartActivityInventory.vue';
import { useRoute } from 'vue-router';

  const route = useRoute()
  const marketId = route.params.id
  console.log(marketId)
</script>

<template>
  <div class="justify-items-center pt-20 text-white">
    <h2 class="font-bold text-2xl">Market Overview</h2>
    <div>
      <div>
        Market:
        Boise City, Id (ID)
      </div>
      <div>
        Median $/ft² (sales):
        $500
      </div>
      <div>
        Median sale (latest)
        $500
      </div>
      <div>
        Sales (last month)
        2,027
      </div>
    </div>
    <ChartMedianPrice :id="marketId"/>
    <ChartActivityInventory :id="marketId"/>
  </div>
</template>