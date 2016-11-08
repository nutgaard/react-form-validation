import { combineReducers } from 'redux';
import formReducer from './../../src/reducer';

export default combineReducers({
    form: formReducer
});
