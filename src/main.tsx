import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import TabularTableDev from './ui/tabular-table-dev';


ReactDOM.render(
    <BrowserRouter>
        <Route path="/app" component={App} />
        <Route path="/dev" component={TabularTableDev} />

    </BrowserRouter>,
    document.getElementById('root')
);
