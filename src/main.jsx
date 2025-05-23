import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Import Bootstrap first
import 'bootstrap/dist/css/bootstrap.min.css';

// Import custom styles after Bootstrap so they can override it
import './styles/main.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
