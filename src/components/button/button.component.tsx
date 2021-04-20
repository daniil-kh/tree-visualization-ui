import React, { MouseEventHandler } from "react";

import ButtonContainer from "./button.styled";

interface ButtonProps {
  title: string;
  onClick: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }): JSX.Element => {
  return <ButtonContainer onClick={onClick}>{title}</ButtonContainer>;
};

export default React.memo(Button);
