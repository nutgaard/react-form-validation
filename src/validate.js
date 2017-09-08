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

export const array = (name, config) => {
    const arrayValidator = (values, props) => {
        const arrayErrors = values
            .map((value) => Object.entries(config)
                .reduce((errors, [field, allrules]) => {
                    const fielderrors = arrayOf(allrules)
                        .map((rule) => rule(value[field], props))
                        .filter((rule) => rule);
                    if (fielderrors.length === 0) {
                        return errors;
                    }
                    return { ...errors, [field]: fielderrors };
                }, {})
            ).map((element) => (Object.keys(element).length > 0 ? element : undefined));

        return arrayErrors.every((element) => element === undefined) ? undefined : arrayErrors;
    };

    arrayValidator.isArrayValidator = true;

    return arrayValidator;
};

export const rules = {
    minLength,
    maxLength,
    contains,
    required,
    array
};

export default function validate(config) {
    return (values, props) => Object.entries(config)
            .map(([field, allrules]) => ({
                field,
                errors: allrules.isArrayValidator ? (allrules(values[field], props)) : arrayOf(allrules)
                    .map((rule) => rule(values[field], props))
                    .filter((rule) => rule)
            }))
            .filter(({ errors }) => errors && errors.length > 0)
            .reduce((acc, { field, errors }) => ({ ...acc, [field]: errors }), {});
}
