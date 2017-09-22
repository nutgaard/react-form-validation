import React from 'react';
import PT from 'prop-types';
import { Field } from 'redux-form';
import { createInlineError, fieldClasses } from './field-utils';

export function FieldRenderer({ input, meta, type, label, className, errorClass, inlineErrorClass, ...props }) {
    const name = input.name;

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
    label: PT.node.isRequired,
    className: PT.string,
    errorClass: PT.string,
    inlineErrorClass: PT.string
};

FieldRenderer.defaultProps = {
    errorClass: 'has-errors',
    inlineErrorClass: 'inline-error-message'
};

const LabelledField = ({ children, ...props }) => <Field {...props} component={FieldRenderer} label={children} />;

LabelledField.propTypes = {
    children: PT.node.isRequired
};

export default LabelledField;
