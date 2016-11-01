import React, { PropTypes as PT } from 'react';
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

Application.propTypes = {};

export default Application;
