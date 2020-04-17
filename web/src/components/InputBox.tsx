import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

interface Props {
  errorMessage: string | undefined;
  inputType: string;
  inputName: string;
  label: string;
  value: any;
  onChange: any;
  onBlur: any;
  className?: string;
}

const InputBox: React.FC<Props> = ({
  inputType,
  inputName,
  label,
  errorMessage,
  value,
  onChange,
  onBlur,
  className,
}) => (
  <div className={className}>
    <div className="title">
      <p className="title--label">{label}</p>
      <p className="title--error">{errorMessage || ""}</p>
    </div>
    <input
      type={inputType}
      name={inputName}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
    />
  </div>
);

export default styled(InputBox)`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 3rem;
  }

  p {
    font-size: 1.8rem;
  }

  input {
    box-sizing: border-box;
    font-size: 1.6rem;
    width: 100%;
    padding: 0.9rem 1rem;
  }

  .title {
    margin-bottom: 0.3rem;
    display: flex;
    justify-content: space-between;

    &--label {
      color: #32354a;
      font-weight: bold;
    }

    &--error {
      color: #8b0000;
    }
  }
`;
