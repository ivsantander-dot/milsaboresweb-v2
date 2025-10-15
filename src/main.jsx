import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// IMPORTANTE: Bootstrap primero, luego global.css
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'

// Importar fuentes desde Google Fonts
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Lato&family=Pacifico&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
