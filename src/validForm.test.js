/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { reduxForm } from 'redux-form';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import validForm from './validForm';

describe('validForm', () => {
    it('should map configuration', () => {
        console.log('validForm', validForm.__Rewire__);
        validForm.__Rewire__('reduxForm', () => {});
    })
});
