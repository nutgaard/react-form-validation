import React from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';

const fieldClasses = (className, meta) => classNames(className, {
    'har-valideringsfeil': meta.touched && meta.error
});
const createInlineError = (name, meta) => {
    if (meta.touched && meta.error) {
        return (
            <div id={`error-${name}`} className="skjema-feilmelding">
                {meta.error}
            </div>
        );
    }
    return null;
};

export function fieldRenderer({ input, meta, type, name, label, className, ...props }) {
    const inlineError = createInlineError(name, meta);
    const ekstraProps = {
        'aria-invalid': meta.touched && !!meta.error,
        'aria-describedby': meta.touched && meta.error ? `error-${name}` : '',
        'id': name,
        ...props
    };

    return (
        <div className={fieldClasses(className, meta)}>
            <label htmlFor={name}>{label}</label>
            <input type={type} {...input} {...ekstraProps} />
            {inlineError}
        </div>
    );
}

function NavField({ children, ...props}) {
    return <Field {...props} component={fieldRenderer} label={children} />
}

export default NavField;