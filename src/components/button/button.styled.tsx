import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  padding: 5px;
  border-radius: 10px;
  border-color: black;
  border-width: 1px;
  overflow: hidden;
  background-color: #f0f0f0;
  &:hover {
    background-color: #d0d0d0;
  }
  text-align: center;
  min-width: 50px;
  cursor: pointer;
`;

export default ButtonContainer;
