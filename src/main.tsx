import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './views/login/login.tsx'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Login />
    
  </BrowserRouter>,
)
