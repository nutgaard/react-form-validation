import { reducer as formReducer } from 'redux-form';

export function updatedFormState(form, oldState, newState) {
    const formState = { ...oldState[form], ...newState };

    return {
        ...oldState,
        [form]: formState
    };
}

export default function reducer(state = {}, action) {
    if (!action.type.includes('redux-form/')) {
        return state;
    }

    const form = action.meta.form;

    if (!form) {
        return formReducer(state, action);
    }
    const nState = formReducer(state, action);

    if (!{}.hasOwnProperty.call(nState[form], 'submittoken')) {
        return updatedFormState(form, nState, { submittoken: null });
    }

    // Actual reducer logic
    if (action.type.indexOf('redux-form/SET_SUBMIT_FAILED') >= 0) {
        return updatedFormState(form, nState, { submittoken: 'token' });
    } else if (action.type.indexOf('redux-form/UPDATE_SYNC_ERRORS') >= 0) {
        const errors = action.payload.syncErrors || {};

        if (Object.keys(errors).length === 0) {
            return updatedFormState(form, nState, { submittoken: null });
        }
        return nState;
    }
    return nState;
}
