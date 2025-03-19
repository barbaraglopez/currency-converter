import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import { VatValidationProvider } from './context/VatValidationContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VatValidationProvider>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </VatValidationProvider>
  </StrictMode>
);
