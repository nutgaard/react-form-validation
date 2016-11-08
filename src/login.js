/* eslint-disable no-console */
import React, { PropTypes as PT } from 'react';
import { SubmissionError } from 'redux-form';
import SkjemaFelt from './../lib/nav-field';
import { rules } from './../lib/validate';
import validForm from './../lib/validForm';

function Login(props) {
    return (
        <form onSubmit={props.handleSubmit} noValidate="noValidate">
            {props.errorSummary}
            <SkjemaFelt name="firstName" type="text" className="blokk-s" required aria-required="true">
                First Name
            </SkjemaFelt>
            <SkjemaFelt name="lastName" type="text" className="blokk-s" required>Last Name</SkjemaFelt>
            <SkjemaFelt name="email" type="text" className="blokk-s">Email</SkjemaFelt>
            <button type="submit">Submit</button>
        </form>
    );
}

Login.propTypes = {
    handleSubmit: PT.func.isRequired,
    errorSummary: PT.node.isRequired
};

// later som man gjør ett fetch kall. Blir ikke kalt før skjemaet er validert ok. :)
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
        email: [rules.required, rules.contains('c')]
    }
})(Login);
