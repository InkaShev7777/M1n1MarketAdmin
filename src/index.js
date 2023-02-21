import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Authorization from './Authorization';
import MainPage from './MainPage';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);

reportWebVitals();
