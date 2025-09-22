import { defineStore } from 'pinia'
import { useMarketService } from '../services/useMarketService'
import { ref } from 'vue'

export const useMarketStore = defineStore('market', () => {
  const { searchMarkets, housingEventPrices, housingEventCounts } = useMarketService()

  const query = ref('')
  const results = ref([])
  const housingPricesResults = ref({})
  const housingCountsResults = ref({})
  const loading = ref(false)
  const error = ref<string | null>(null)

  const search = async () => {
    loading.value = true
    try {
      const response = await searchMarkets(query)
      results.value = response
    } catch (err: any) {
      error.value = err || 'Server Error'
    } finally {
      loading.value = false
    }
  }

  const housingPrices = async (id: number) => {
    loading.value = true
    try {
      const response = await housingEventPrices(id)
      housingPricesResults.value = response
    } catch (err: any) {
      error.value = err || 'Server Error'
    } finally {
      loading.value = false
    }
  }

  const housingCounts = async (id: number) => {
    loading.value = true
    try {
      const response = await housingEventCounts(id)
      housingCountsResults.value = response
    } catch (err: any) {
      error.value = err || 'Server Error'
    } finally {
      loading.value = false
    }
  }

  return {
    query,
    results,
    housingPricesResults,
    housingCountsResults,
    loading,
    error,
    search,
    housingPrices,
    housingCounts,
  }
})
