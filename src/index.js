import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import App1 from './App1.jsx';
import Login from './login.jsx'
import { BrowserRouter, HashRouter } from 'react-router-dom'


ReactDOM.render( <
    React.StrictMode >

    <
    App1 / >


    <
    /React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();