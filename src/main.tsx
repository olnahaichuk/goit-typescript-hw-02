import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App/App.js'
import Modal from 'react-modal';
import './index.css'

Modal.setAppElement('#root');

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
