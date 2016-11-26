/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import subset from 'chai-subset';
import validForm, { __RewireAPI__ } from './validForm';

chai.use(subset);

describe('validForm', () => {
    it('should map configuration', () => {
        const config = {
            form: 'formname'
        };

        // eslint-disable-next-line no-underscore-dangle
        __RewireAPI__.__Rewire__('reduxForm', (mappedConfig) => {
            expect(mappedConfig).to.containSubset({
                form: 'formname'
            });
            expect(typeof mappedConfig.validate).to.equal('function');

            return () => null;
        });


        validForm(config)(null);
    });
});
