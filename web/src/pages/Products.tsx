import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useTable, Column, CellProps } from "react-table";
import {
  useProductsQuery,
  useCreateProductMutation,
  useLogoutMutation,
} from "../generated/graphql";
import styled from "styled-components";
import { setAccessToken } from "../accessToken";

interface Props extends RouteComponentProps {
  className?: string;
}

type Data = object;

const Table = ({
  columns,
  data,
}: {
  columns: Column<Data>[];
  data: Data[];
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Products: React.FC<Props> = ({ className, history }) => {
  const { data, loading } = useProductsQuery();
  const [logout] = useLogoutMutation();

  const [createProduct] = useCreateProductMutation();

  const columns = React.useMemo(
    () => [
      {
        Header: "Product ID",
        accessor: "id",
      },
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Price",
        accessor: "price",
      },
    ],
    []
  );

  const onLogout = async () => {
    const response = await logout();
    if (response.data && response.data.logout) {
      setAccessToken("");
      history.push("/login");
    }
    return;
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
    <Table columns={columns} data={data?.products!} />
  );

  return (
    <div className={className}>
      <div className="products">
        <div className="products__header">
          <h1>Products</h1>
          <p onClick={onLogout} className="products__logout">
            Logout
          </p>
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
    padding: 5rem;

    &__header {
      margin-bottom: 3rem;
      display: flex;
      justify-content: space-between;

      > * {
        display: flex;
        align-items: center;
        margin: 0;
      }
    }

    &__logout {
      cursor: pointer;
    }

    &__table {
      table {
        margin: auto;
        border-spacing: 10rem 1rem;
      }

      td {
        text-align: center;
        vertical-align: middle;
      }
    }
  }
`;

export default StyledProducts;
