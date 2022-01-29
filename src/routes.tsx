import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ToolForm from './pages/Form/index';
import Index from './pages/Index';

export default function Routes() {
    return (
        <Switch>
            <Route path="/v1/tools" exact component={Index} />
            <Route path="/v1/tools/form" exact component={ToolForm} />
        </Switch>
    );
}