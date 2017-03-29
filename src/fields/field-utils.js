import React from 'react';

import classNames from 'classnames';

export const fieldClasses = (className, errorClass, meta) => classNames(className, {
    [errorClass]: meta.touched && meta.error
});

export const createInlineError = (name, inlineErrorClass, meta) => {
    if (meta.touched && meta.error) {
        return (
            <div id={`error-${name}`} role="alert" aria-live="assertive" className={inlineErrorClass}>
                {meta.error}
            </div>
        );
    }
    return null;
};
