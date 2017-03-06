import React, { PropTypes as PT } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';

export const fieldClasses = (className, errorClass, meta) => classNames(className, {
    [errorClass]: meta.touched && meta.error
});
const createInlineError = (name, inlineErrorClass, meta) => {
    if (meta.touched && meta.error) {
        return (
            <div id={`error-${name}`} className={inlineErrorClass}>
                {meta.error}
            </div>
        );
    }
    return null;
};

export function FieldRenderer({ input, meta, type, name, label, className, errorClass, inlineErrorClass, ...props }) {
    const inlineError = createInlineError(name, inlineErrorClass, meta);
    const ekstraProps = {
        'aria-invalid': meta.touched && !!meta.error,
        'aria-describedby': meta.touched && meta.error ? `error-${name}` : '',
        id: name,
        ...props
    };

    return (
        <div className={fieldClasses(className, errorClass, meta)}>
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
    className: PT.string,
    errorClass: PT.string,
    inlineErrorClass: PT.string
};

FieldRenderer.defaultProps = {
    errorClass: 'has-errors',
    inlineErrorClass: 'inline-error-message'
};

function LabelledField({ children, ...props }) {
    return <Field {...props} component={FieldRenderer} label={children} />;
}

LabelledField.propTypes = {
    children: PT.node.isRequired
};

export default LabelledField;
