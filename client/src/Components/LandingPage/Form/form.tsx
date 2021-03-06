import React from "react";
import "./form.scss";

interface FormContainerProps {
  Submit: (event: React.FormEvent) => void;
}

export const FormContainer: React.FC<FormContainerProps> = (props) => {
  const { Submit, children } = props;
  return (
    <React.Fragment>
      <form id="form-container" onSubmit={Submit}>
        {children}
      </form>
    </React.Fragment>
  );
};

interface FormInputProps {
  value: string;
  ChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  type: string
}

export const FormInput: React.FC<FormInputProps> = (props) => {
  const { value, ChangeValue, placeholder, name, type } = props;

  return (
    <React.Fragment>
      <input
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={ChangeValue}
        type={type}
        autoComplete="on"
        className='form-input'
      />
    </React.Fragment>
  );
};

interface FormButtonProps {
  buttonName: string;
}

export const FormButton: React.FC<FormButtonProps> = ({ buttonName }) => {
  return (
    <button id="form-button" type="submit">
      {buttonName}
    </button>
  );
};

export const OAuthButton: React.FC<FormButtonProps> = ({ buttonName }) => {
  return (
    <button id="oauth-btn" type="button">
      {buttonName}
    </button>
  );
};

export const FormLabel: React.FC<{ name: string; labelName: string }> = ({
  name,
  labelName,
}) => {
  return (
    <React.Fragment>
      <label htmlFor={name} id="form-label">
        {labelName}
      </label>
    </React.Fragment>
  );
};
