import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './Routes';
import AuthProvider from './context/AuthProvider';
import { BrowserRouter } from "react-router-dom"

import "./style.css"
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
