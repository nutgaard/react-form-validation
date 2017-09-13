import React from 'react';
import DevTools from './devtools';

import Login from './login';
import DynamicList from './dynamiclist';

const initialValues = {
    list: [
        {
            name: '',
            description: ''
        },
        {
            name: '',
            description: ''
        },
        {
            name: '',
            description: ''
        }
    ]
};

function Application() {
    return (
        <div>
            <Login />
            <DynamicList initialValues={initialValues}/>
            <DevTools />
        </div>
    );
}

export default Application;
