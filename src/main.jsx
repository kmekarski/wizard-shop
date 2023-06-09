import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ProductsContextProvider } from './context/productsContext'
import { UserContextProvider } from './context/userContext'
import { ModalContextProvider } from './context/modalContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ModalContextProvider>
        <UserContextProvider>
            <ProductsContextProvider>
                <App />
            </ProductsContextProvider>
        </UserContextProvider>
    </ModalContextProvider>
)
