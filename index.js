import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './example/store';
import App from './example/index'

render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('application')
);
