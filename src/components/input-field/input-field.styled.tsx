import styled from "styled-components";

const InputFieldContainer = styled.div`
  display: flex;
  padding: 5px;
`;

export const TextInput = styled.input`
  height: 30px;
  border-width: 0px;
  border-bottom-width: 1px;
  transition: transform 0.5s;
  transform: scaleX(0.7);
  &:focus {
    outline: none;
    border-bottom-color: red;
    border-bottom-width: 2px;
    transition: transform 0.5s;
    transform: scaleX(1);
  }
`;

export default InputFieldContainer;
