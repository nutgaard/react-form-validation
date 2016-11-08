export function arrayOf(val) {
    return Array.isArray(val) ? val : [val];
}
export function minLength(min, error = 'min-length') {
    return (value) => (value && value.length >= min ? undefined : error);
}
export function maxLength(max, error = 'max-length') {
    return (value) => (value && value.length <= max ? undefined : error);
}
export function contains(needle, error = 'contains') {
    return (value) => (value && value.includes(needle) ? undefined : error);
}

export const required = minLength(0, 'required');

export const rules = {
    minLength,
    maxLength,
    contains,
    required
};

export default function validate(config) {
    return (values) =>
        Object.entries(config)
            .map(([field, allrules]) => ({
                field,
                errors: arrayOf(allrules)
                    .map((rule) => rule(values[field]))
                    .filter((rule) => rule)
            }))
            .filter(({ errors }) => errors && errors.length > 0)
            .reduce((acc, { field, errors }) => ({ ...acc, [field]: errors }), {})
        ;
}
