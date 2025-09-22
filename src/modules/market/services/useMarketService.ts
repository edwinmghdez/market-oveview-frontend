import client from '@/core/config/axios'

export function useMarketService() {
  const searchMarkets = async (query: string) => {
    const queryParam = query.value
    const data = await client
      .get('search/markets', { params: { query: queryParam } })
      .then((response) => response.items)

    return data
  }

  const housingEventPrices = async (id: number) => {
    const data = await client.get(`housing-event-prices/${id}`).then((response) => response)

    return data
  }

  const housingEventCounts = async (id: number) => {}

  return { searchMarkets, housingEventPrices, housingEventCounts }
}
