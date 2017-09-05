import React from 'react';
import DevTools from './devtools';

import Login from './login';
import DynamicList from './dynamiclist';

const initialValues = {
    list: [
        {
            name: 'Name 1',
            description: 'Description 1'
        },
        {
            name: 'Name 2 Name 2',
            description: 'Description 2 Description 2'
        },
        {
            name: 'Name 3',
            description: 'Description 3'
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
