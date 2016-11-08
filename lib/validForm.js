import React, { createElement, PropTypes as PT, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Fields, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validation from './validate';

const defaultListCreator = (header, errors) => (
    <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="panel panel-feilsammendrag text-left"
        tabIndex="-1"
    >
        <h3 className="typo-undertittel">{header}</h3>
        <ul>
            {errors}
        </ul>
    </div>
);
const defaultElementCreator = ({ name, error }) => (
    <li key={`${name}-${error}`}>
        <a href={`#${name}`}>{error}</a>
    </li>
);

function feedbackSummaryFactory(listCreator = defaultListCreator,
                                elementCreator = defaultElementCreator) {
    class FeedbackSummary extends Component {
        constructor(props) {
            super(props);

            this.getErrors = this.getErrors.bind(this);
        }

        getErrors(props) {
            const { names, submittoken, ...fields } = props;

            if (submittoken === null) {
                return null;
            }

            const errors = names
                .map((name) => ({ name, errors: fields[name].meta.error }))
                .filter(({ errors }) => errors && errors.length > 0)
                .reduce((acc, namedErrors) => {
                    if (Array.isArray(namedErrors.errors)) {
                        return [...acc, ...namedErrors.errors.map((error) => ({
                            name: namedErrors.name,
                            error
                        }))];
                    }
                    return [...acc, namedErrors];
                }, []);

            if (errors.length === 0) {
                return null;
            }

            return errors;
        }

        render() {
            const errors = this.getErrors(this.props);
            if (!errors) {
                return null;
            }

            const errorElements = errors.map(elementCreator);
            return listCreator(this.props.header, errorElements);
        }
    }

    FeedbackSummary.defaultProps = {
        header: 'Feil ved innsending'
    };
    FeedbackSummary.propTypes = {
        header: PT.string.isRequired
    };

    return FeedbackSummary;
}

function getSubmittokenFromStore(form) {
    return (state) => ({
        submittoken: state.form[form].submittoken
    });
}

export function validForm(config) {
    const { form, validate, listCreator, elementCreator, ...rest } = config;

    const defaultSummary = feedbackSummaryFactory(listCreator, elementCreator);


    const fields = Object.keys(validate);

    return (WrappedComponent) => {
        const mappedConfig = {
            form,
            validate: validation(validate),
            ...rest
        };

        class Wrapper extends Component {
            handleSubmitProxy(...args) {
                return Promise.resolve(this.props.handleSubmit(...args))
                    .then((result) => {
                        if (typeof result !== 'object') {
                            // Resolved ok from onSubmit promise
                            return result;
                        }
                        // Rejected from onSubmit promise
                        // Result contains keys from fields, then it had a validation error
                        const hasField = Object.keys(result)
                            .find((errorField) => fields.includes(errorField));

                        if (hasField) {
                            const summary = this.refs.panel.getRenderedComponent();
                            findDOMNode(summary).focus();
                        }

                        return result;
                    });
            }

            render() {
                const { submittoken, ...props } = this.props;

                const errorSummary = <Fields
                    names={fields}
                    component={defaultSummary}
                    submittoken={submittoken}
                    withRef
                    ref="panel"
                />;
                const useProps = {
                    ...props,
                    errorSummary,
                    handleSubmit: this.handleSubmitProxy.bind(this)
                };

                return createElement(WrappedComponent, useProps);
            }
        }

        return reduxForm(mappedConfig)(connect(getSubmittokenFromStore(form))(Wrapper));
    }
}