import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Formik } from "formik";
import { useLoginMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

interface StyledProps {
  className?: string;
}

type Props = RouteComponentProps & StyledProps;

const validateInput = (values: { email: string; password?: string }) => {
  const errors: { email?: string; password?: string } = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export const Login: React.FC<Props> = ({ className, history }) => {
  const [login] = useLoginMutation();

  return (
    <div className={className}>
      <div className="container">
        <h1 className="title">E-commerce Backoffice</h1>
        <Formik
          validateOnChange={true}
          initialValues={{ email: "", password: "" }}
          validate={(values) => validateInput(values)}
          onSubmit={async ({ email, password }, { setSubmitting }) => {
            const response = await login({
              variables: {
                email,
                password,
              },
            });

            if (response && response.data) {
              setAccessToken(response.data.login.accessToken);
            }
            history.push("/");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <div className="login-form__field">
                  <div className="login-form__title">
                    <p className="login-form__title--label">Email</p>
                    <p className="login-form__title--error">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div className="login-form__field">
                  <div className="login-form__title">
                    <p className="login-form__title--label">Password</p>
                    <p className="login-form__title--error">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
              </div>
              <button type="submit">Login</button>
            </form>
          )}
        </Formik>
        <p className="credit">Developed by Tanawit Pattanaveerangkoon</p>
      </div>
    </div>
  );
};

export default styled(Login)`
  height: 100vh;
  width: 100vw;
  background-color: #32354a;

  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    padding: 5rem;
  }

  .title {
    color: #ffffff;
    font-size: 4rem;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-top: 0;
    margin-bottom: 5rem;
  }

  .login-form {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 2rem;
    width: 35rem;
    margin: auto;
    padding: 4rem;
    margin-bottom: 5rem;

    button {
      width: 100%;
      font-size: 1.8rem;
      font-weight: bold;
      color: #32354a;
      padding: 1rem;
      cursor: pointer;
      border: none;
      text-transform: uppercase;

      &:hover {
        background-color: #32354a;
        color: #ffffff;
        transition: all 0.2s;
      }
    }

    &__field {
      margin-bottom: 2rem;

      &:last-child {
        margin-bottom: 3rem;
      }

      p {
        font-size: 1.8rem;
        margin: 0 0 1rem;
      }

      input {
        border: none;
        box-sizing: border-box;
        font-size: 1.6rem;
        width: 100%;
        padding: 0.9rem 1rem;
      }
    }

    &__title {
      display: flex;
      justify-content: space-between;

      &--label {
        color: #32354a;
        font-weight: bold;
      }

      &--error {
        color: #8b0000;
        font-size: 1.4rem;
      }
    }
  }

  .credit {
    font-size: 2.2rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 0;
  }
`;
