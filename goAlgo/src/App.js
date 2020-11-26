import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavBar from './layout/NavBar';
import SortingViz from './SortingViz/SortingViz';
import PathFindingViz from './PathfindingViz/PathfindingViz';
import WhatsAnAlgorithm from './About/WhatsAnAlgorithm';


function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/pathfinding">
                    <NavBar />
                    <PathFindingViz></PathFindingViz>
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/sorting">
                    <NavBar />
                    <SortingViz></SortingViz>
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/">
                    <WhatsAnAlgorithm />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
