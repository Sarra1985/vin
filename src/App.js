import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact to="/" component={Home} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
