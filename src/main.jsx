import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { MainRouter } from './router/MainRouter.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { store } from './app/Store.jsx'
import { Provider } from 'react-redux'

let persistor = persistStore(store);
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <PersistGate persistor={persistor}>
  <RouterProvider router={MainRouter}/>
  </PersistGate>
  </Provider>
  </StrictMode>,
)
