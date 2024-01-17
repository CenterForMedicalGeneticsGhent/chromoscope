import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import TabularTableDev from './ui/tabular-table-dev';
import GrietFigures from "./pages/2023-12-20_figures-griet";
import trioDupFig from "./pages/2024-01-11_duplication-trio-viz"


ReactDOM.render(
    <BrowserRouter>
        <Route path="/app" component={App} />
        <Route path="/dev" component={TabularTableDev} />
        <Route path="/griet" component={GrietFigures} />
        <Route path="/triodupfig" component={trioDupFig} />
    </BrowserRouter>,
    document.getElementById('root')
);
