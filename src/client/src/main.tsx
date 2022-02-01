import React from 'react';
import ReactDOM from 'react-dom';

import { CompositeProvider } from 'components/providers/Composite/Composite.provider';
import { App } from './App';
import 'utils/Translation/i18n.util';

ReactDOM.render(
    <CompositeProvider>
        <App />
    </CompositeProvider>,
    document.getElementById('root'),
);
