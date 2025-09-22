import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

client.interceptors.response.use(
  (response) => {
    console.log('Interceptor - Response:', {
      status: response.status,
      url: response.config.url,
      headers: response.headers,
      response: response.data,
    })
    return response.data
  },
  async (error) => {
    // Review error response
    console.log('Interceptor - Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      response: error.response?.data,
    })

    return Promise.reject(error)
  },
)

export default client
