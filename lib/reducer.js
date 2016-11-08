import { reducer as formReducer } from 'redux-form';

function updatedFormState(form, oldState, newState) {
    const formState = { ...oldState[form], ...newState };
    return {
        ...oldState,
        [form]: formState
    }
}

export function reducer(state = {}, action) {
    if (!action.type.includes('redux-form/')) {
        return state;
    }

    const form = action.meta.form;

    if (!form) {
        return formReducer(state, action);
    }
    const nState = formReducer(state, action);

    if (!nState[form].hasOwnProperty('submittoken')) {
        return updatedFormState(form, nState, { submittoken: null });
    }

    //Actual reducer logic
    switch (action.type) {
        case 'redux-form/SET_SUBMIT_FAILED': {
            return updatedFormState(form, nState, { submittoken: 'token' });
        }
        case 'redux-form/UPDATE_SYNC_ERRORS': {
            const errors = action.payload.syncErrors || {};
            if (Object.keys(errors).length === 0) {
                return updatedFormState(form, nState, { submittoken: null });
            }
            return nState;
        }
        default: {
            return nState;
        }
    }
}