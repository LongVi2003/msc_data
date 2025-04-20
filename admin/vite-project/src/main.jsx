import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { KeycloakProviderWrapper } from './auth/KeycloakProviderWrapper.jsx';

// Có thể bỏ StrictMode nếu cần debug
createRoot(document.getElementById('root')).render(
  <KeycloakProviderWrapper>
    <App />
  </KeycloakProviderWrapper>
);
