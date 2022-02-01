import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MainView } from 'views/Main/Main.view';

export const App: React.FC = () => (
    <div>
        <Switch>
            <Route path="/" exact>
                <MainView />
            </Route>
        </Switch>
    </div>
);
