import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import GrietFigures from "./pages/2023-12-20_figures-griet";
import trioDupFig from './pages/2024-01-11_duplication-trio-viz copy';
import trioDupFig2 from './pages/2024-03-06_duplication-trio-viz_2';


ReactDOM.render(
    <BrowserRouter>
        <Route path="/app" component={App} />
        <Route path="/griet" component={GrietFigures} />
        <Route path="/triodupfig" component={trioDupFig} />
        <Route path="/triodupfig2" component={trioDupFig2} />
    </BrowserRouter>,
    document.getElementById('root')
);
