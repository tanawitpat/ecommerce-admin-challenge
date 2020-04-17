import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

const StyledHeader = styled.div`
  margin: auto;
  max-width: 900px;
  position: static;
  top: 0;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  font-weight: bold;

  .logout {
    font-size: 2rem;
    cursor: pointer;
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
      <p onClick={onLogout} className="logout">
        Logout
      </p>
    </StyledHeader>
  );
};

export default AuthHeader;
