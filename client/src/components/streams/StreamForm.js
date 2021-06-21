import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError(meta) {
    if (meta.touched && meta.error) {
      return (
        <div className="ui error message">
          <div className="header">{meta.error}</div>
        </div>
      );
    }
  }

  renderInput = (formProps) => {
    const formClassName = `field ${
      formProps.meta.error && formProps.meta.touched ? "error" : ""
    }`;

    return (
      <div className={formClassName}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        {this.renderError(formProps.meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="Title" component={this.renderInput} label="Enter Title" />
        <Field
          name="Description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validateInputs = (formValues) => {
  const errors = {};
  if (!formValues) {
    errors.Description = "You must enter in Title";
  }
  if (!formValues.Description) {
    errors.Description = "You must enter in a description";
  }

  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: validateInputs,
})(StreamForm);
