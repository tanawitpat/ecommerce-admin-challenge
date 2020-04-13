import React from "react";
import styled from "styled-components";
import { usePingQuery } from "../generated/graphql";

const StyledTitle = styled.h1`
  color: red;
`;
const StyledGraphQLStatus = styled.p`
  color: black;
  font-size: 20px;
`;

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading } = usePingQuery();

  return (
    <div>
      <StyledTitle>Home</StyledTitle>
      {loading || !data ? (
        <StyledGraphQLStatus>Loading</StyledGraphQLStatus>
      ) : (
        <StyledGraphQLStatus>{data.ping}</StyledGraphQLStatus>
      )}
    </div>
  );
};
