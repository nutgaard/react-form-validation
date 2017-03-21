import React, { PropTypes as PT, cloneElement } from 'react';
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

export function CustomFieldRenderer({ input, meta, customComponent, className, errorClass, inlineErrorClass,
    ...props }) {
    const name = input.name;
    const inlineError = createInlineError(name, inlineErrorClass, meta);
    const ekstraProps = {
        'aria-invalid': meta.touched && !!meta.error,
        'aria-describedby': meta.touched && meta.error ? `error-${name}` : '',
        id: name,
        ...props
    };

    const augmentedComponent = cloneElement(customComponent, { ...ekstraProps, input, meta });

    return (
        <div className={fieldClasses(className, errorClass, meta)}>
            {augmentedComponent}
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

CustomFieldRenderer.propTypes = {
    input: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    meta: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    customComponent: PT.node.isRequired,
    className: PT.string,
    errorClass: PT.string,
    inlineErrorClass: PT.string
};

FieldRenderer.defaultProps = {
    errorClass: 'has-errors',
    inlineErrorClass: 'inline-error-message'
};

CustomFieldRenderer.defaultProps = {
    errorClass: 'has-errors',
    inlineErrorClass: 'inline-error-message'
};

export function LabelledField({ children, ...props }) {
    return <Field {...props} component={FieldRenderer} label={children} />;
}

export function CustomField({ ...props }) {
    return <Field {...props} component={CustomFieldRenderer} />;
}

LabelledField.propTypes = {
    children: PT.node.isRequired
};

CustomField.propTypes = {
};
