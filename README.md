# react-form-validation
A helper library to `redux-form` to implement better validation.

[![circleci.com](https://circleci.com/gh/nutgaard/react-form-validation/tree/master.svg?style=shield&circle-token=eac92b11bdaf00ced5e560c3251bcc164eecb2df)](https://circleci.com/gh/nutgaard/react-form-validation/tree/master)
[![codecov.io](https://codecov.io/github/nutgaard/react-form-validation/coverage.svg?branch=master)](https://codecov.io/github/nutgaard/react-form-validation?branch=master)
[![Dependency Status](https://david-dm.org/nutgaard/react-form-validation.svg)](https://david-dm.org/nutgaard/react-form-validation)
[![devDependency Status](https://david-dm.org/nutgaard/react-form-validation/dev-status.svg)](https://david-dm.org/nutgaard/react-form-validation#info=devDependencies)
[![peerDependency Status](https://david-dm.org/nutgaard/react-form-validation/peer-status.svg)](https://david-dm.org/nutgaard/react-form-validation#info=peerDependencies)


## How to install

```
npm install react-redux-form-validation react react-dom react-redux redux redux-form redux-thunk --save
```


## How to use

Import and use the `react-form-validation` components, in stead of the corresponding `redux-form` components. 
```
import { LabelledField, validForm, rules } from 'react-redux-form-validation';
```
In your form use the `react-form-validation` components.
```
<LabelledField name="title" type="text">
    Title Label
</LabelledField>
```
When making your `redux-form` use `react-form-validation`'s `validForm` method, and pass it a `validate` prop for the fields that you want to validate. `react-form-validation` also provides rules that you can use to simplify the declaration.
```
const myValidForm = validForm({
    form: 'my-form',
    onSubmit: onSubmit,
    validate: {
        title: [rules.required],
        field-two: [rules.required, rules.contains('content')]
    }
})(ValidFormComponent);
```
finaly, you have to use the `react-form-validation` reducer in stead of the `redux-form` reducer.
```
import { reducer as formReducer } from 'react-redux-form-validation';

export default combineReducers({
    form: formReducer
});
```

---

An example can be seen in the [example](example)
