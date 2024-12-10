import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import UserContextProvider from './store/userContext.jsx'
import { Provider } from 'react-redux'
import store from './store/dataRedux.jsx'
import queryClient from './query_client/queryClient.js'
import { QueryClientProvider } from '@tanstack/react-query'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
