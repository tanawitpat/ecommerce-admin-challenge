import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import styled from "styled-components";
import {
  useProductsQuery,
  useDeleteProductMutation,
} from "../generated/graphql";

interface Props extends RouteComponentProps {
  className?: string;
}

const Products: React.FC<Props> = ({ className }) => {
  const { data, loading } = useProductsQuery();
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
              <Link to={`/product/${product.id}`}>Edit</Link>
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
        <div className="products__header">
          <h1>Products</h1>
          <Link to="/products/create">
            <button>Create</button>
          </Link>
        </div>
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

    &__header {
      display: flex;
      justify-content: space-between;

      h1 {
        margin-top: 0;
      }

      a {
        height: fit-content;
      }

      button {
        font-size: 1.8rem;
        padding: 1rem 2rem;
        background-color: #32354a;
        color: white;
        border: none;
        cursor: pointer;
      }
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
