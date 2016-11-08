import React from 'react';
import DevTools from './devtools';

import Login from './login';

function Application() {
    return (
        <div>
            <Login />
            <DevTools />
        </div>
    );
}

export default Application;
