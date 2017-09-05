export function arrayOf(val) {
    return Array.isArray(val) ? val : [val];
}
export function minLength(min, error = 'min-length') {
    return (value) => (value && value.length >= min ? undefined : error);
}
export function maxLength(max, error = 'max-length') {
    return (value) => (value && value.length > max ? error : undefined);
}
export function contains(needle, error = 'contains') {
    return (value) => (value && value.includes(needle) ? undefined : error);
}

export const required = minLength(0, 'required');

export const fieldArray = (name, config) => (values, props) => {
    const errors = values
        .map((value, idx) => {
            return Object.entries(config)
                .map(([field, allrules]) => ({
                    field: `${name}[${idx}].${field}`,
                    errors: arrayOf(allrules)
                        .map((rule) => rule(value[field], props))
                        .filter((rule) => rule)
                }))
                .filter(({ errors }) => errors && errors.length > 0)
                .reduce((acc, { field, errors }) => ({ ...acc, [field]: errors }), {});
        })
        .reduce((acc, errors) => ({...acc, ...errors}), {});

    const noError = Object.entries(errors).every(([_, error]) => {
        return !error || error.length === 0;
    });

    if (!noError) {
        return { ...errors, [name]: ['invalid'] };
    }

    return errors;
};

function liftFieldArrayErrors(errors) {
    return Object.entries(errors)
        .map(([fieldName, fieldErrors]) => {
            if (fieldErrors.every((error) => typeof error === 'string')) {
                return { [fieldName]: fieldErrors };
            } else {
                return fieldErrors
                    .reduce((acc, error) => ({...acc, ...error}), {});
            }
        }).reduce((acc, error) => ({...acc, ...error}), {});
}

export const rules = {
    minLength,
    maxLength,
    contains,
    required,
    fieldArray
};

export default function validate(config) {
    return (values, props) => {
        const errors = Object.entries(config)
            .map(([field, allrules]) => ({
                field,
                errors: arrayOf(allrules)
                    .map((rule) => rule(values[field], props))
                    .filter((rule) => rule)
            }))
            .filter(({ errors }) => errors && errors.length > 0)
            .reduce((acc, { field, errors }) => ({ ...acc, [field]: errors }), {});

        return liftFieldArrayErrors(errors);
    }
}
