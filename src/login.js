import React, { Component } from 'react';
import { Field, Fields, reduxForm } from 'redux-form';
import validate, { rules } from './form/validate';
import { validForm } from './form/validForm';

function FormField(field) {
    return (
        <div className="input-row">
            <input {...field.input} type={field.type} />
            { field.meta.touched && field.meta.error && <span className="error">{field.meta.error}</span> }
        </div>
    );
}

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


function Login({ handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" component={FormField} type="text"/>
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" component={FormField} type="text"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" component={FormField} type="email"/>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default validForm({
    form: 'login',
    validation: {
        'firstName': [rules.required, rules.contains('a')],
        'lastName': [rules.required, rules.contains('b')],
        'email': [rules.required, rules.contains('c')]
    }
})(Login);