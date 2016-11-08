import { combineReducers } from 'redux';
import { reducer as formReducer } from './../../lib/reducer'

export default combineReducers({
    form: formReducer
});