import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
