import React from "react";
import { useParams, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import {
  useProductQuery,
  useUpdateProductMutation,
} from "../generated/graphql";
import { Formik } from "formik";
import InputBox from "../components/InputBox";

export const Product: React.FC<RouteComponentProps> = ({ history }) => {
  const { productId } = useParams();
  const { data, loading, error } = useProductQuery({
    variables: {
      id: Number(productId),
    },
  });
  const [updateProduct] = useUpdateProductMutation();

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
    const response = await updateProduct({
      variables: {
        id: Number(productId),
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
    if (!Number(values.price)) {
      errors.price = "Price must be a number";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    if (!values.imagePath) {
      errors.imagePath = "Required";
    }

    return errors;
  };

  if (!data || loading) {
    return <div>Loading...</div>;
  }

  if (error && !loading) {
    history.push("/");
  }

  const product = data.product;

  return (
    <StyledProduct>
      <h1>{product.name}</h1>
      <Formik
        validateOnChange={true}
        initialValues={{
          name: product.name,
          price: product.price,
          imagePath: product.imagePath,
          description: product.description,
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
              <button type="submit">Save</button>
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
