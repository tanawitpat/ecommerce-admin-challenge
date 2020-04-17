import React, { useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import {
  useProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../generated/graphql";
import styled from "styled-components";

interface Props extends RouteComponentProps {
  className?: string;
}

const Products: React.FC<Props> = ({ className }) => {
  const { data, loading } = useProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const onDeleteProduct = async (id: number) => {
    try {
      await deleteProduct({
        variables: {
          id,
        },
        refetchQueries: ["Products"],
        awaitRefetchQueries: true,
      });
    } catch (err) {
      console.log("Cannot delete a product");
      console.log(err);
    }
  };

  // FOR DEVELOPMENT
  useEffect(() => {
    createProduct({
      variables: {
        name: "PRODUCT NAME A",
        description: "PRODUCT DESCRIPTION A",
        price: 3000,
        imagePath: "https://google.com",
      },
    });
  }, []);
  //

  const productTable = loading ? (
    <p>Loading...</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data!.products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td className="products__table--actions">
              <Link to={`/products/${product.id}`}>Edit</Link>
              <p onClick={() => onDeleteProduct(product.id)}>Delete</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className={className}>
      <div className="products">
        <h1>Products</h1>
        <div className="products__table">{productTable}</div>
      </div>
    </div>
  );
};

const StyledProducts = styled(Products)`
  max-width: 900px;
  margin: auto;

  .products {
    padding: 2rem 5rem;

    h1 {
      margin-top: 0;
    }

    &__table {
      table {
        margin: auto;
        border-spacing: 7.5rem 1rem;
      }

      td {
        text-align: center;
        vertical-align: middle;
      }

      &--actions {
        display: flex;

        a {
          margin-right: 1.5rem;
        }

        > * {
          margin: 0;
          color: black;
          text-decoration: none;
          cursor: pointer;

          &:hover {
            font-weight: bold;
          }
        }
      }
    }
  }
`;

export default StyledProducts;
