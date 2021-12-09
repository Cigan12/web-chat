import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const MainView = React.lazy(() =>
    import('./views/Main/Main.view').then(({ MainView }) => ({
        default: MainView,
    })),
);

const SignUpView = React.lazy(() =>
    import('./views/SignUp/SignUp.view').then(({ SignUpView }) => ({
        default: SignUpView,
    })),
);

const SignInView = React.lazy(() =>
    import('./views/SignIn/SignIn.view').then(({ SignInView }) => ({
        default: SignInView,
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
                <Route path="/signup">
                    <Suspense fallback="loading">
                        <SignUpView />
                    </Suspense>
                </Route>
                <Route path="/signin">
                    <Suspense fallback="loading">
                        <SignInView />
                    </Suspense>
                </Route>
            </Switch>
        </Router>
    </div>
);
