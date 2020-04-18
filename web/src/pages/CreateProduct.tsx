import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { Formik } from "formik";
import { useCreateProductMutation } from "../graphql/types";
import InputBox from "../components/InputBox";

export const Product: React.FC<RouteComponentProps> = ({ history }) => {
  const [createProduct] = useCreateProductMutation();

  const onSave = async ({
    name,
    price,
    description,
    imagePath,
  }: {
    name: string;
    price: number;
    description: string;
    imagePath: string;
  }) => {
    const response = await createProduct({
      variables: {
        name,
        price: Number(price),
        description,
        imagePath,
      },
      refetchQueries: ["Products"],
      awaitRefetchQueries: true,
    });

    if (response && response.data) {
      history.push("/products");
      return;
    }

    return;
  };

  const validateInput = (values: {
    name: string;
    price: number;
    description: string;
    imagePath: string;
  }) => {
    const errors: {
      name?: string;
      price?: string;
      description?: string;
      imagePath?: string;
    } = {};

    if (!values.name) {
      errors.name = "Required";
    }
    if (!Number(values.price) && Number(values.price) !== 0) {
      errors.price = "Price must be a number";
    }
    if (!values.description) {
      errors.description = "Required";
    }

    return errors;
  };

  return (
    <StyledProduct>
      <h1>Create a product</h1>
      <Formik
        validateOnChange={true}
        initialValues={{
          name: "",
          price: 0,
          imagePath: "",
          description: "",
        }}
        validate={validateInput}
        onSubmit={onSave}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => {
          return (
            <StyledUpdateProductForm onSubmit={handleSubmit}>
              <div>
                <InputBox
                  inputType="text"
                  inputName="name"
                  label="Name"
                  value={values.name}
                  errorMessage={errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputBox
                  inputType="text"
                  inputName="description"
                  label="Description"
                  value={values.description}
                  errorMessage={errors.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputBox
                  inputType="text"
                  inputName="price"
                  label="Price"
                  value={values.price}
                  errorMessage={errors.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <InputBox
                  inputType="text"
                  inputName="imagePath"
                  label="Image Path"
                  value={values.imagePath}
                  errorMessage={errors.imagePath}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <button type="submit">Create</button>
            </StyledUpdateProductForm>
          );
        }}
      </Formik>
    </StyledProduct>
  );
};

const StyledProduct = styled.div`
  max-width: 900px;
  margin: auto;
`;

const StyledUpdateProductForm = styled.form`
  button {
    font-size: 1.8rem;
    padding: 1.5rem 2rem;
    background-color: #32354a;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

export default Product;
