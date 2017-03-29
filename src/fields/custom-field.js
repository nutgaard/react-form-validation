import React, { PropTypes as PT, cloneElement } from 'react';
import { Field } from 'redux-form';
import { createInlineError, fieldClasses } from './field-utils';

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

