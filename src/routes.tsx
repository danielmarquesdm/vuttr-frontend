import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Form from './pages/Form';
import Index from './pages/Index';

export default function Routes() {
    return (
        <Switch>
            <Route path="/v1/tools" exact component={Index} />
            <Route path="/v1/tools/:id" exact component={Form} />
        </Switch>
    );
}