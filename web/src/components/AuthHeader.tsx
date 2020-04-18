import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import styled from "styled-components";
import { useLogoutMutation } from "../graphql/types";
import { setAccessToken } from "../accessToken";

const StyledHeader = styled.div`
  margin: auto;
  max-width: 900px;
  position: static;
  top: 0;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;

  > * {
    margin: 1rem;
    font-size: 2rem;
    cursor: pointer;
    text-decoration: none;
    color: black;

    &:hover {
      font-weight: bold;
    }

    &:not(:last-child) {
      margin-right: 4rem;
    }
  }
`;

const AuthHeader: React.FC<RouteComponentProps> = ({ history }) => {
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    const response = await logout();
    if (response.data && response.data.logout) {
      setAccessToken("");
      history.push("/login");
    }
    return;
  };

  return (
    <StyledHeader>
      <Link to="/">Home</Link>
      <p onClick={onLogout}>Logout</p>
    </StyledHeader>
  );
};

export default AuthHeader;
