import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App';

import UserProvider from "./context/UserContext";
import { BrowserRouter } from "react-router-dom";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
