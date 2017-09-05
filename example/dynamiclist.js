import React from 'react';
import { FieldArray } from 'redux-form';
import LabelledField from '../src/fields/labelled-field';
import { rules } from './../src/validate';
import validForm from './../src/validForm';

function listRenderer({ fields }) {
    return (
      <div>
          {fields.map((person) => {
              return (
                  <div key={person}>
                      <LabelledField name={`${person}.name`} type="text" required>Name</LabelledField>
                      <LabelledField name={`${person}.description`} type="text" required>Description</LabelledField>
                  </div>
              )
          })}
      </div>
    );
}

function Dynamiclist({ handleSubmit, errorSummary, submitting }){
    return (
        <form onSubmit={handleSubmit}>
            <h1>Dynamic List</h1>
            {errorSummary}
            <FieldArray name="list" component={listRenderer} />
            <button type="submit" disabled={submitting}>Submit</button>
        </form>
    );
}

Dynamiclist.propTypes = {};

export default validForm({
    form: 'list',
    onSubmit: (values) => new Promise((resolve) => { console.log('onSubmit', values); resolve('ok'); }),
    validate: {
        list: rules.fieldArray('list', {
            name: [rules.required, rules.minLength(10)],
            description: [rules.minLength(20)]
        })
    }
})(Dynamiclist);
