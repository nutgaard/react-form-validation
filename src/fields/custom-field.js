import React, { cloneElement } from 'react';
import PT from 'prop-types';
import { Field } from 'redux-form';
import { fieldClasses } from './field-utils';

export function CustomFieldRenderer({ input, meta, customComponent, className, errorClass,
    inlineErrorClass: _inlineErrorClass,
    ...props }) {
    const name = input.name;
    const errorMessage = (meta.touched && meta.error) ? meta.error : null;
    const ekstraProps = {
        'aria-invalid': meta.touched && !!meta.error,
        'aria-describedby': meta.touched && meta.error ? `error-${name}` : '',
        id: name,
        ...props
    };

    const augmentedComponent = cloneElement(customComponent, { ...ekstraProps, errorMessage, input, meta });

    return (
        <div className={fieldClasses(className, errorClass, meta)}>
            {augmentedComponent}
        </div>
    );
}

CustomFieldRenderer.propTypes = {
    input: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    meta: PT.object.isRequired, // eslint-disable-line react/forbid-prop-types
    customComponent: PT.node.isRequired,
    className: PT.string,
    errorClass: PT.string,
    inlineErrorClass: PT.string
};

CustomFieldRenderer.defaultProps = {
    errorClass: 'has-errors',
    inlineErrorClass: 'inline-error-message'
};

export default function CustomField({ ...props }) {
    return <Field {...props} component={CustomFieldRenderer} />;
}

