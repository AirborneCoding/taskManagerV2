import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import './styles/mynormalize.css'

import { store } from './redux/store.js'
import { Provider } from 'react-redux'

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AppV2 from './AppV2.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <AppV2 />
      <ToastContainer position='top-center' />
    </Provider>
  </React.StrictMode>,
)
