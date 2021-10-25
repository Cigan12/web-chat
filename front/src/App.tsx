import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const MainView = React.lazy(() =>
    import('./views/Main/Main.view').then(({ MainView }) => ({
        default: MainView,
    })),
);

export const App: React.FC = () => (
    <div>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Suspense fallback="loading">
                        <MainView />
                    </Suspense>
                </Route>
            </Switch>
        </Router>
    </div>
);
