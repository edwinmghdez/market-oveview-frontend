import client from '@/core/config/axios'

export function useMarketService() {
  const searchMarkets = async (query: string, offset: number) => {
    const data = await client
      .get('search/markets', { params: { query: query, offset: offset } })
      .then((response) => response)

    return data
  }

  const housingEventPrices = async (id: number) => {
    const data = await client.get(`housing-event-prices/${id}`).then((response) => response)

    return data
  }

  const housingEventCounts = async (id: number) => {
    const data = await client.get(`housing-event-counts/${id}`).then((response) => response)

    return data
  }

  return { searchMarkets, housingEventPrices, housingEventCounts }
}
