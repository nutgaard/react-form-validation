import React, { createElement } from 'react';
import { Fields, reduxForm } from 'redux-form';
import validate from './validate';

function FeedbackSummary(config) {
    const { names, ...fields } = config;

    const errors = names
        .map((name) => fields[name].meta.error)
        .filter((errors) => errors && errors.length > 0)
        .reduce((acc, errors) => {
            if (Array.isArray(errors)) {
                return [ ...acc, ...errors ];
            }
            return [ ...acc, errors ];
        }, []);

    if (errors.length === 0) {
        return null;
    }

    const errorLi = errors.map((error) => <li>{error}</li>);
    return (
        <ul>
            {errorLi}
        </ul>
    );
}

export function validForm(config) {
    const { name, validation, ...rest } = config;
    const fields = Object.keys(validation);
    const mappedConfig = {
        form: name,
        validate: validate(validation),
        ...rest
    };

    return (WrappedComponent) => {
        function Wrapper() {
            return (
                <div>
                    <h1>Test</h1>
                    <Fields names={fields} component={FeedbackSummary}/>
                    {createElement(WrappedComponent, {})}
                </div>
            );
        }

        return reduxForm(mappedConfig)(Wrapper);
    }
}