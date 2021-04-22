import styled, { css, keyframes } from "styled-components";

type DropDownContentContainerProps = {
  isOpen: any;
};

type DropDownContentProps = {
  selected?: boolean;
};

export const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 150px;
`;

export const DropDownContentContainer = styled.div<DropDownContentContainerProps>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex: 1;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 1;
  algin-items: center;
  margin-top: 30px;
`;

const selectedItem = css`
  text-shadow: red 0px 0 7px;
`;

const onMouseHoverAnimation = keyframes`
  from {transform: scale(0.8);}
  to {transform: scale(1.1);}
`;

const onMouseHoverOffAnimation = keyframes`
  from {transform: scale(1.1);}
  to {transform: scale(0.8);}
`;

export const DropDownContent = styled.div<DropDownContentProps>`
  display: flex;
  flex: 1;
  cursor: pointer;
  margin: 0 2px;
  border-radius: 15px;
  overflow: hidden;
  &:hover {
    animation-name: ${onMouseHoverAnimation};
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }

  animation-name: ${onMouseHoverOffAnimation};
  animation-duration: 1s;
  animation-fill-mode: both;

  justify-content: center;
  width: 100%;
  ${(props) => (props.selected ? selectedItem : null)}
`;

export const DropDownTitle = styled.div`
  font-size: 16;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
`;
