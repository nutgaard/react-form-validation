import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './devtools';
import rootReducer from './ducks/index';

const enhancer = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunk),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
);

export default function configureStore() {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    return createStore(rootReducer, {}, enhancer);
}
