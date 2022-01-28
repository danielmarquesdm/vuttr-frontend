import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './pages/index';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route  path="/v1/tools" component={Index} />
            <Route path="/v1/tools/create" component={Index} />
        </Switch>
    );
}

export default Routes;