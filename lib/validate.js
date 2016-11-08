function arrayOf(val) {
    return Array.isArray(val) ? val : [val];
}
function minLength(min, error = 'min-length') {
    return (value) => (value && value.length >= min ? undefined : error);
}
function maxLength(max, error = 'max-length') {
    return (value) => (value && value.length <= max ? undefined : error);
}
function contains(needle) {
    return (value) => (value && value.includes(needle) ? undefined : 'contains');
}

export const rules = {
    minLength,
    maxLength,
    contains,
    required: minLength(0, 'required')
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
