import React, { PropTypes as PT } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';

export const fieldClasses = (className, meta) => classNames(className, {
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

export function FieldRenderer({ input, meta, type, name, label, className, ...props }) {
    const inlineError = createInlineError(name, meta);
    const ekstraProps = {
        'aria-invalid': meta.touched && !!meta.error,
        'aria-describedby': meta.touched && meta.error ? `error-${name}` : '',
        id: name,
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

FieldRenderer.propTypes = {
    input: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    meta: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    type: PT.string.isRequired,
    name: PT.string.isRequired,
    label: PT.node.isRequired,
    className: PT.string
};

function NavField({ children, ...props }) {
    return <Field {...props} component={FieldRenderer} label={children} />;
}

NavField.propTypes = {
    children: PT.node.isRequired
};

export default NavField;
