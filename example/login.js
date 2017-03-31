/* eslint-disable no-console */
import React, { PropTypes as PT } from 'react';
import { SubmissionError } from 'redux-form';
import LabelledField from '../src/fields/labelled-field';
import CustomField from '../src/fields/custom-field';
import { rules } from './../src/validate';
import validForm from './../src/validForm';

function MyCustomComponent({ children, input, inlineError, meta, ...props }) {
    const id = ('' + Math.random()).slice(2);
    return (
        <div>
            <label htmlFor={id}>{children}</label>
            <input type="text" id={id} {...input} {...props} />
            <div>{inlineError}</div>
        </div>
    );
}

function Login(props) {
    return (
        <form onSubmit={props.handleSubmit} noValidate="noValidate">
            {props.errorSummary}
            <LabelledField name="firstName" type="text" required aria-required="true">
                First Name
            </LabelledField>
            <LabelledField name="lastName" type="text" required>Last Name</LabelledField>
            <LabelledField name="email" type="text">Email</LabelledField>
            <CustomField
                name="customComponent"
                customComponent={
                    <MyCustomComponent>Min label</MyCustomComponent>
                } />
            <button type="submit">Submit</button>
        </form>
    );
}

Login.propTypes = {
    handleSubmit: PT.func.isRequired,
    errorSummary: PT.node.isRequired
};

// Pretending to do a `fetch`-call, which should not be called before the schema is validated.
// This is just for test purposes.
const asyncOnsubmit = (values) => new Promise((resolve, _reject) => {
    console.log('onSubmit config', values);
    // _reject('ok');     // Returns promise, resolved([ undefined ])
    resolve('ok'); // Returns promise, resolved('ok')
}).then((ok) => {
    // throw new SubmissionError({ _error: 'Ukjent feil' })
    console.log('submit ok', ok);
    return 'All ok';
}).catch((err) => {
    console.error('submit feiled', err);
    throw new SubmissionError({ _error: 'Ukjent feil' });
});

export default validForm({
    form: 'login',
    onSubmit: asyncOnsubmit,
    validate: {
        firstName: [rules.required, rules.contains('a')],
        lastName: [rules.required, rules.contains('b')],
        email: [rules.required, rules.contains('c')],
        customComponent: [rules.required],
    }
})(Login);
