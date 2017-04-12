import React from 'react';
import DevTools from './devtools';

import Login from './login';

function Application() {
    return (
        <div>
            <Login />
            <Login form="login-second"/>
            <Login form="login-third"/>
            <Login form="login-third"/>
            <DevTools />
        </div>
    );
}

export default Application;
