import React, { Component, PropTypes as PT } from 'react';

export function DefaultListCreator({ header, errors }) {
    return (
        <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className="feedbacksummary"
            tabIndex="-1"
        >
            <h3>{header}</h3>
            <ul>
                {errors}
            </ul>
        </div>
    );
}

DefaultListCreator.propTypes = {
    header: PT.oneOfType([PT.string, PT.node]).isRequired,
    errors: PT.arrayOf(PT.node).isRequired
};


export function DefaultElementCreator({ name, error }) {
    return (
        <li key={`${name}-${error}`}>
            <a href={`#${name}`}>{error}</a>
        </li>
    );
}

DefaultElementCreator.propTypes = {
    name: PT.string.isRequired,
    error: PT.string.isRequired
};

function isUsingFieldArray(namedErrors) {
    return Array.isArray(namedErrors.errors) &&
        namedErrors.errors.length > 0 &&
        typeof namedErrors.errors[0] !== 'string';
}

export function getErrors(props) {
    const { names, submittoken, ...fields } = props;

    if (submittoken === null) {
        return null;
    }
    const formErrors = names
        .map((name) => ({ name, errors: fields[name].meta.error }))
        .filter(({ errors }) => errors && errors.length > 0)
        .reduce((acc, namedErrors) => {
            if (isUsingFieldArray(namedErrors)) {
                const suberrorsConfig = namedErrors.errors
                    .map((suberrors, idx) => {
                        if (!suberrors) {
                            return [];
                        }
                        return Object.entries(suberrors)
                            .map(([subkey, suberror]) => ({
                                name: `${namedErrors.name}[${idx}].${subkey}`,
                                error: suberror
                            }));
                    })
                    .filter((suberrors) => suberrors.length > 0)
                    .reduce((list, suberrors) => [...list, ...suberrors], []);

                return [...acc, ...suberrorsConfig];
            } else if (Array.isArray(namedErrors.errors)) {
                return [...acc, ...namedErrors.errors.map((error) => ({
                    name: namedErrors.name,
                    error
                }))];
            }
            return [...acc, { name: namedErrors.name, error: namedErrors.errors }];
        }, []);

    if (formErrors.length === 0) {
        return null;
    }

    return formErrors;
}

export function feedbackSummaryFactory(listCreator = DefaultListCreator,
                                       elementCreator = DefaultElementCreator) {
    class FeedbackSummary extends Component {
        render() {
            const errors = getErrors(this.props);
            if (!errors) {
                return null;
            }

            const errorElements = errors.map(elementCreator);
            return listCreator({ header: this.props.header, errors: errorElements });
        }
    }

    FeedbackSummary.defaultProps = {
        header: 'Errors'
    };
    FeedbackSummary.propTypes = {
        header: PT.node.isRequired
    };

    return FeedbackSummary;
}
