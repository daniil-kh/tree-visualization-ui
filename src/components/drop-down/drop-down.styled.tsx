import styled from "styled-components";

type DropDownContentContainerProps = {
  isOpen: any;
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

export const DropDownContent = styled.div`
  display: flex;
  flex: 1;
  cursor: pointer;
  margin: 0 2px;
  transition: transform 0.5s;
  transform: scale(0.8);
  border-radius: 15px;
  overflow: hidden;
  &:hover {
    transition: transition 0.5s color 0.5s;
    transform: scale(1.1);
  }
  justify-content: center;
  width: 100%;
`;

export const DropDownTitle = styled.div`
  font-size: 16;
  font-weight: bold;
  cursor: pointer;
  padding: 10px;
`;
