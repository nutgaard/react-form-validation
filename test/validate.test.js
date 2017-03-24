/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import validate, * as Func from '../src/validate';

describe('validate', () => {
    describe('arrayOf', () => {
        it('should return array regardless of input', () => {
            const liste = [1, 2, 3];
            const verdi = 'abba';

            expect(Func.arrayOf(liste)).to.equal(liste);
            expect(Func.arrayOf(verdi)).to.deep.equal([verdi]);
        });
    });

    describe('minLength', () => {
        it('should return predefined errormessage', () => {
            const errorMessage = Func.minLength(5)('aba');
            expect(errorMessage).to.not.be.equal(undefined);
            expect(errorMessage.length).to.not.be.equal(0);
        });

        it('should return given errorMessage', () => {
            expect(Func.minLength(5, 'e')('aba')).to.be.equal('e');
        });

        it('should return undefined when valid', () => {
            expect(Func.minLength(5, 'e')('abaBA')).to.be.equal(undefined);
        });
    });

    describe('maxLength', () => {
        it('should return predefined errormessage', () => {
            const errorMessage = Func.maxLength(3)('abab');
            expect(errorMessage).to.not.be.equal(undefined);
            expect(errorMessage.length).to.not.be.equal(0);
        });
        it('should return given errorMessage', () => {
            expect(Func.maxLength(3, 'e')('abab')).to.be.equal('e');
        });
        it('should return undefined when valid', () => {
            expect(Func.maxLength(3, 'e')('aba')).to.be.equal(undefined);
        });
        it('should return undefined for empty string', () => {
            expect(Func.maxLength(3, 'e')('')).to.be.equal(undefined);
        });
        it('should return undefined for undefined input', () => {
            expect(Func.maxLength(3, 'e')(undefined)).to.be.equal(undefined);
        });
    });

    describe('contains', () => {
        it('should return predefined errormessage', () => {
            const errorMessage = Func.contains('abba')('abab');
            expect(errorMessage).to.not.equal(undefined);
            expect(errorMessage.length).to.not.be.equal(0);
        });
        it('should return given errorMessage', () => {
            expect(Func.contains('abba', 'e')('abab')).to.be.equal('e');
        });
        it('should return undefined when valid', () => {
            expect(Func.contains('abba', 'e')('aba abba oasida')).to.be.equal(undefined);
        });
    });

    describe('required', () => {
        it('should return predefined errormessage', () => {
            expect(Func.required()).to.not.equal(undefined);
            expect(Func.required().length).to.not.be.equal(0);
            expect(Func.required('')).to.not.equal(undefined);
            expect(Func.required('').length).to.not.be.equal(0);
        });
        it('should return undefined when valid', () => {
            expect(Func.required('abba')).to.be.equal(undefined);
        });
    });

    describe('validate', () => {
        const error = (id) => `error${id}`;
        const rule = (id) => () => `error${id}`;

        it('should return configured function', () => {
            expect(typeof validate({})).to.be.equal('function');
        });

        it('should apply single rule', () => {
            const config = { field: rule(1) };
            const validator = validate(config);
            const result = validator({ field: '' });

            expect(result).to.deep.equal({ field: [error(1)] });
        });

        it('should apply all rules for a given field', () => {
            const config = { field: [rule(1), rule(2)] };
            const validator = validate(config);
            const result = validator({ field: '' });

            expect(result).to.deep.equal({
                field: [error(1), error(2)]
            });
        });

        it('should not have keys with no errors', () => {
            const config = { field: rule(1), field2: () => undefined };
            const validator = validate(config);
            const result = validator({
                field: '',
                field2: ''
            });

            expect(result).to.deep.equal({
                field: [error(1)]
            });
        });

        it('should validate multiple fields with with multiple rules', () => {
            const config = {
                field1: [rule(1), rule(2), rule(3)],
                field2: [rule(4), () => undefined, rule(5)],
                field3: () => undefined,
                field4: rule(6)
            };
            const validator = validate(config);
            const result = validator({
                field1: '',
                field2: '',
                field3: '',
                field4: ''
            });

            expect(result).to.deep.equal({
                field1: [error(1), error(2), error(3)],
                field2: [error(4), error(5)],
                field4: [error(6)]
            });
        });
    });
});
