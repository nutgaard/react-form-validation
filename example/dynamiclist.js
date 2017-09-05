import React, { PropTypes as PT } from 'react';
import { FieldArray } from 'redux-form';
import LabelledField from '../src/fields/labelled-field';
import { rules } from './../src/validate';
import validForm from './../src/validForm';

function listRenderer({ fields }) {
    return (
        <div>
            {fields.map((person) => (
                <div key={person}>
                    <LabelledField name={`${person}.name`} type="text">Name</LabelledField>
                    <LabelledField name={`${person}.description`} type="text">Description</LabelledField>
                </div>
              ))}
        </div>
    );
}
listRenderer.propTypes = {
    fields: PT.object // eslint-disable-line react/forbid-prop-types
};

function Dynamiclist({ handleSubmit, errorSummary }) {
    return (
        <form onSubmit={handleSubmit}>
            <h1>Dynamic List</h1>
            {errorSummary}
            <LabelledField name="tittel" type="text">Header</LabelledField>
            <FieldArray name="list" component={listRenderer} />
            <button type="submit">Submit</button>
        </form>
    );
}

Dynamiclist.propTypes = {
    handleSubmit: PT.func.isRequired,
    errorSummary: PT.node.isRequired
};

export default validForm({
    form: 'list',
    onSubmit: (values) => new Promise((resolve) => { console.log('onSubmit', values); resolve('ok'); }),
    validate: {
        tittel: [rules.required, rules.minLength(10)],
        list: rules.array('list', {
            name: [rules.required, rules.minLength(10)],
            description: [rules.minLength(20)]
        })
    }
})(Dynamiclist);
