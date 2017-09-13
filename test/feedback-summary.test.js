/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import chai, { expect } from 'chai';
import subset from 'chai-subset';
import { shallow } from 'enzyme';
import * as Func from '../src/feedback-summary';

chai.use(subset);

describe('feedback-summary', () => {
    describe('DefaultListCreator', () => {
        it('should have correct attributes on element', () => {
            const wrapper = shallow(<Func.DefaultListCreator header="" errors={[]} />);

            const wrappingDiv = wrapper.find('div');
            const header = wrapper.find('h3');

            expect(wrappingDiv.props()).to.containSubset({
                'aria-live': 'assertive',
                'aria-atomic': 'true',
                tabIndex: '-1',
                className: 'feedbacksummary'
            });
            expect(header.length).to.equal(1);
        });

        it('should render correct header', () => {
            const headerProp = 'my-header';
            const wrapper = shallow(<Func.DefaultListCreator header={headerProp} errors={[]} />);

            const header = wrapper.find('h3');

            expect(header.text()).to.be.equal('my-header');
        });

        it('should render correct header', () => {
            const wrapper = shallow(<Func.DefaultListCreator header="my-header" errors={[]} />);

            const header = wrapper.find('h3');

            expect(header.text()).to.be.equal('my-header');
        });

        it('should render correct header', () => {
            const headerProp = <span>My-Header</span>;
            const wrapper = shallow(<Func.DefaultListCreator header={headerProp} errors={[]} />);

            const header = wrapper.find('h3');

            expect(header.find('span').length).to.equal(1);
            expect(header.text()).to.be.equal('My-Header');
        });

        it('should render correct amount of list-elements', () => {
            const errors = [
                <li><span>Error1</span></li>,
                <li><span>Error2</span></li>,
                <li><span>Error3</span></li>
            ];
            const wrapper = shallow(<Func.DefaultListCreator header="" errors={errors} />);

            const list = wrapper.find('ul');

            expect(list.find('li').length).to.equal(3);
            expect(list.childAt(0).text()).to.equal('Error1');
            expect(list.childAt(1).text()).to.equal('Error2');
            expect(list.childAt(2).text()).to.equal('Error3');
        });
    });

    describe('DefaultElementCreator', () => {
        it('should return li with anchor element', () => {
            const wrapper = shallow(<Func.DefaultElementCreator name="name" error="error" />);

            const li = wrapper.find('li');
            const anchor = li.find('a');

            expect(li.key()).to.equal('name-error');
            expect(anchor.prop('href')).to.equal('#name');
            expect(anchor.text()).to.equal('error');
        });
    });

    describe('getErrors', () => {
        it('should return null if no submittoken is provided', () => {
            expect(Func.getErrors({ submittoken: null })).to.equal(null);
        });

        it('should return null if there is no errors', () => {
            const props = {
                submittoken: 'token',
                names: ['field1', 'field2'],
                field1: { meta: { error: [] } },
                field2: { meta: {} }
            };
            expect(Func.getErrors(props)).to.equal(null);
        });

        it('should return all error', () => {
            const props = {
                submittoken: 'token',
                names: ['field1', 'field2'],
                field1: { meta: { error: ['required', 'contains'] } },
                field2: { meta: { error: 'contains' } }
            };

            expect(Func.getErrors(props)).to.deep.equal([
                { name: 'field1', error: 'required' },
                { name: 'field1', error: 'contains' },
                { name: 'field2', error: 'contains' }
            ]);
        });

        it('should return all errors in list', () => {
            const props = {
                submittoken: 'token',
                names: ['title', 'list'],
                title: { meta: { error: 'required' } },
                list: { meta: { error: [{ name: ['required'], description: ['required'] },
                    { name: ['required'], description: ['required'] }] } }
            };

            expect(Func.getErrors(props)).to.deep.equal([
                { name: 'title', error: 'required' },
                { name: 'list[0].name', error: ['required'] },
                { name: 'list[0].description', error: ['required'] },
                { name: 'list[1].name', error: ['required'] },
                { name: 'list[1].description', error: ['required'] }
            ]);
        });

        it('should only return fields in list with error', () => {
            const props = {
                submittoken: 'token',
                names: ['title', 'list'],
                title: { meta: { error: 'required' } },
                list: { meta: { error: [undefined,
                    { name: ['required'], description: ['required'] }] } }
            };

            expect(Func.getErrors(props)).to.deep.equal([
                { name: 'title', error: 'required' },
                { name: 'list[1].name', error: ['required'] },
                { name: 'list[1].description', error: ['required'] }
            ]);
        });
    });

    describe('feedbackSummaryFactory', () => {
        it('should provide good defaults', () => {
            const props = {
                submittoken: 'token',
                names: ['field1', 'field2'],
                field1: { meta: { error: ['required', 'contains'] } },
                field2: { meta: { error: 'contains' } }
            };
            const panel = Func.feedbackSummaryFactory();
            const wrapper = shallow(React.createElement(panel, props));

            const list = wrapper.find('ul');

            expect(list.find('li').length).to.equal(3);
            expect(list.childAt(0).text()).to.equal('required');
            expect(list.childAt(1).text()).to.equal('contains');
            expect(list.childAt(2).text()).to.equal('contains');
        });

        it('should return null if there is no errors', () => {
            const props = {
                submittoken: 'token',
                names: ['field1', 'field2'],
                field1: { meta: { error: [] } },
                field2: { meta: {} }
            };

            const panel = Func.feedbackSummaryFactory();
            const wrapper = shallow(React.createElement(panel, props));

            expect(wrapper.type()).to.equal(null);
        });
    });
});
