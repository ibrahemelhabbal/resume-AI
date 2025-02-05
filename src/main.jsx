import ReactDOM from 'react-dom/client';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

const clerkFrontendApi = 'https://evident-lemming-16.clerk.accounts.dev';
const publishableKey =
  'pk_test_ZXZpZGVudC1sZW1taW5nLTE2LmNsZXJrLmFjY291bnRzLmRldiQ';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ClerkProvider frontendApi={clerkFrontendApi} publishableKey={publishableKey}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>,
);
