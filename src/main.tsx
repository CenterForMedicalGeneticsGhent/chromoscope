import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import TabularTableDev from './ui/tabular-table-dev';
import GrietFigures from "./pages/2023-12-20_figures-griet";


ReactDOM.render(
    <BrowserRouter>
        <Route path="/app" component={App} />
        <Route path="/dev" component={TabularTableDev} />
        <Route path="/griet" component={GrietFigures} />

    </BrowserRouter>,
    document.getElementById('root')
);
