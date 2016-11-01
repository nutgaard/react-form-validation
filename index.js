import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './src/store';
import App from './src/index'

render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('application')
);