import { combineReducers } from 'redux';
import formReducer from './../../lib/reducer';

export default combineReducers({
    form: formReducer
});
