const arrayOf = (val) => Array.isArray(val) ? val : [val];

const minLength = (min, error = 'min-length') => (value) => value && value.length >= min ? undefined : error;
const maxLength = (min, error = 'max-length') => (value) => value && value.length <= max ? undefined : error;
const contains = (needle) => (value) => value && value.includes(needle) ? undefined : 'contains';

export const rules = {
    minLength,
    maxLength,
    contains,
    required: minLength(0, 'required')
};

export default function validate(config) {
    return (values) => {
        return Object.entries(config)
            .map(([field, rules]) => ({ field, errors: arrayOf(rules)
                .map((rule) => rule(values[field]))
                .filter((rule) => rule)
            }))
            .filter(({errors}) => errors && errors.length > 0)
            .reduce((acc, {field, errors}) => ({ ...acc, [field]: errors }), {});
    }
}