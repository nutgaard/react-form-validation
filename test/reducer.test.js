/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies, no-underscore-dangle */
import { expect } from 'chai';
import reducer, * as Func from '../src/reducer';

describe('reducer', () => {
    const formState = { values: {} };
    const state = {
        form1: formState,
        form2: formState
    };

    describe('updateFormState', () => {
        it('should only mutate state for one form', () => {
            const newState = Func.updatedFormState('form1', state, { values: 'hei' });

            expect(newState).to.deep.equal({
                form1: { values: 'hei' },
                form2: formState
            });
            expect(newState.form2).to.equal(formState);
        });
    });

    describe('reducer', () => {
        const reduxFormAction = (form, type = 'redux-form/TEST') => ({
            type,
            meta: {
                form
            }
        });

        it('should not mutate state for non redux-form actions', () => {
            const newState = reducer(state, { type: 'not-reduxform' });

            expect(newState).to.equal(state);
        });

        it('should shortcurcuit to formReducer if form is not defined in state', () => {
            reducer.__Rewire__('formReducer', () => ({ mock: 'mock' }));
            const newState = reducer(state, reduxFormAction(undefined));
            reducer.__ResetDependency__('formReducer');

            expect(newState).to.deep.equal({ mock: 'mock' });
        });

        it('should add a submittoken if it doesnt exist for current form', () => {
            const newState = reducer(state, reduxFormAction('form1'));

            expect(newState.form1.submittoken).to.equal(null);
            expect(newState.form2.submittoken).to.equal(undefined);
        });

        it('should set token on submit failed', () => {
            const initalState = { ...state, form1: { submittoken: null } };
            reducer.__Rewire__('formReducer', (s) => s);
            const newState = reducer(initalState, reduxFormAction('form1', 'redux-form/SET_SUBMIT_FAILED'));
            reducer.__ResetDependency__('formReducer');

            expect(newState.form1.submittoken).to.equal('token');
            expect(newState.form2.submittoken).to.equal(undefined);
        });

        it('should not reset token when there are errors in form', () => {
            const initalState = { ...state, form1: { submittoken: 'token' } };
            reducer.__Rewire__('formReducer', (s) => s);
            const newState = reducer(initalState, {
                type: 'redux-form/UPDATE_SYNC_ERRORS',
                meta: {
                    form: 'form1'
                },
                payload: { syncErrors: {
                    field1: 'required'
                } }
            });
            reducer.__ResetDependency__('formReducer');

            expect(newState.form1.submittoken).to.equal('token');
            expect(newState.form2.submittoken).to.equal(undefined);
        });

        it('should reset token when there are no more errors in form', () => {
            const initalState = { ...state, form1: { submittoken: 'token' } };
            reducer.__Rewire__('formReducer', (s) => s);
            const newState = reducer(initalState, {
                type: 'redux-form/UPDATE_SYNC_ERRORS',
                meta: {
                    form: 'form1'
                },
                payload: {}
            });
            reducer.__ResetDependency__('formReducer');

            expect(newState.form1.submittoken).to.equal(null);
            expect(newState.form2.submittoken).to.equal(undefined);
        });

        it('should not mutate state on other redux-form actions', () => {
            const initalState = { ...state, form1: { submittoken: 'token' } };
            reducer.__Rewire__('formReducer', (s) => s);
            const newState = reducer(initalState, {
                type: 'redux-form/UNKNOWN_ACTION',
                meta: {
                    form: 'form1'
                },
                payload: {}
            });
            reducer.__ResetDependency__('formReducer');

            expect(newState.form1.submittoken).to.equal('token');
            expect(newState.form2.submittoken).to.equal(undefined);
        });
    });
});
