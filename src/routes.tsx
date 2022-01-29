import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CreateTool from './pages/Create';
import Index from './pages/Index';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/v1/tools" exact component={Index} />
            <Route path="/v1/tools/:id" exact component={CreateTool} />
        </Switch>
    );
}

export default Routes;