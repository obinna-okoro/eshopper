import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from "react-helmet-async";
import App from './App';
import { StoreProvider } from './context/store';

ReactDOM.render(
    <StoreProvider>
    <HelmetProvider>
    <App />
    </HelmetProvider>
    </StoreProvider>
   , document.querySelector('#root')
);


