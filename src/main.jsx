import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ProductsContextProvider } from './context/productsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ProductsContextProvider>
        <App />
    </ProductsContextProvider>
)
