const MarketSearch = () => import('./views/MarketSearch.vue')
const MarketDetail = () => import('./views/MarketDetail.vue')

export const marketRoutes = [
  {
    path: '/market',
    name: 'market',
    component: MarketSearch,
  },
  {
    path: '/market/:id',
    name: 'marketDetail',
    component: MarketDetail,
    props: true,
  },
]
