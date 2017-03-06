/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { reduxForm } from 'redux-form';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import LabelledField, * as Func from '../src/field';

describe('LabelledField', () => {
    describe('fieldClasses', () => {
        it('should return classNames if there is no validation errors', () => {
            expect(Func.fieldClasses('test', '', {})).to.equal('test');
        });

        it('should return extra class if there are errors', () => {
            expect(Func.fieldClasses('test', 'error-class', { touched: true, error: [] })).to.equal('test error-class');
        });
    });

    describe('FieldRenderer', () => {
        const defaultProps = {
            input: {},
            meta: {},
            type: 'text',
            name: 'name',
            label: 'label'
        };
        const defaultErrorProps = {
            ...defaultProps,
            meta: { touched: true, error: ['contains'] }
        };

        it('should render field', () => {
            const wrapper = shallow(<Func.FieldRenderer {...defaultProps} />);

            const div = wrapper.find('div');
            const label = div.find('label');
            const input = div.find('input');

            expect(div.length).to.equal(1);
            expect(label.length).to.equal(1);
            expect(input.length).to.equal(1);

            expect(label.prop('htmlFor')).to.equal('name');
            expect(input.prop('id')).to.equal('name');
            expect(input.prop('aria-invalid')).to.equal(undefined);
            expect(input.prop('aria-describedby')).to.equal('');
        });

        it('should render div with className', () => {
            const wrapper = shallow(<Func.FieldRenderer {...defaultProps} className="test" />);

            const div = wrapper.find('div');

            expect(div.length).to.equal(1);
            expect(div.prop('className')).to.equal('test');
        });

        it('should pass props onto input-field', () => {
            const wrapper = shallow(<Func.FieldRenderer {...defaultProps} required="required" />);

            const input = wrapper.find('input');

            expect(input.prop('required')).to.equal('required');
        });

        it('should render inline-error message if there are errors', () => {
            const wrapper = shallow(<Func.FieldRenderer {...defaultErrorProps} />);

            const errorMessage = wrapper.find('#error-name');
            const input = wrapper.find('input');

            expect(errorMessage.length).to.equal(1);
            expect(errorMessage.prop('className')).to.equal('inline-error-message');
            expect(errorMessage.text()).to.equal('contains');
            expect(wrapper.prop('className')).to.equal('has-errors');
            expect(input.prop('aria-invalid')).to.equal(true);
            expect(input.prop('aria-describedby')).to.equal('error-name');
        });
    });

    describe('LabelledField', () => {
        const store = configureMockStore()();
        const ContextProvider = reduxForm({
            form: 'name'
        })(({ children }) => (
            <form>{children}</form>
        ));


        it('should render children as label', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <ContextProvider>
                        <LabelledField className="test" required="required" name="name" type="text">
                            label
                        </LabelledField>
                    </ContextProvider>
                </Provider>
            );

            const label = wrapper.find('label');
            const classname = wrapper.find('.test');
            const otherProps = wrapper.find('[required]');

            expect(label.text()).to.equal('label');

            expect(classname.length).to.equal(1);
            expect(classname.type()).to.equal('div');

            expect(otherProps.length).to.equal(1);
            expect(otherProps.type()).to.equal('input');
        });
    });
});
