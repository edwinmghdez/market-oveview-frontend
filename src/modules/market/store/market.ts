import { defineStore } from 'pinia'
import { useMarketService } from '../services/useMarketService'
import { ref } from 'vue'

export const useMarketStore = defineStore('market', () => {
  const { searchMarkets, housingEventPrices, housingEventCounts } = useMarketService()

  const query = ref('')
  const results = ref([])
  const housingPricesResults = ref({})
  const housingCountsResults = ref({})
  const currentPage = ref(1)
  const pageSize = ref(12)
  const totalItems = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const search = async () => {
    loading.value = true
    try {
      const page = currentPage.value - 1
      const response = await searchMarkets(query.value, page)
      results.value = response.items
      totalItems.value = response.total
    } catch (err: any) {
      error.value = err || 'Server Error'
    } finally {
      loading.value = false
    }
  }

  const changePage = (page: number) => {
    if (page < 1) return
    currentPage.value = page
    search()
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
    currentPage,
    pageSize,
    totalItems,
    loading,
    error,
    search,
    changePage,
    housingPrices,
    housingCounts,
  }
})
