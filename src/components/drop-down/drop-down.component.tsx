import React, { useState } from "react";

import {
  DropDownContainer,
  DropDownContentContainer,
  DropDownContent,
  DropDownTitle,
} from "./drop-down.styled";

type DropDownElement = {
  name: string;
  value: string;
};

type DropDownProps = {
  title: string;
  list: Array<DropDownElement>;
  onSelect: (value: string) => void;
};

const DropDown: React.FC<DropDownProps> = ({
  title,
  list,
  onSelect,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false as boolean);

  const listToRender = list.map(
    (element: DropDownElement): JSX.Element => (
      <DropDownContent
        key={element.value}
        onClick={() => onSelect(element.value)}
      >
        {element.name}
      </DropDownContent>
    )
  );

  return (
    <DropDownContainer>
      <DropDownTitle onClick={() => setIsOpen((prevValue) => !prevValue)}>
        {title}
      </DropDownTitle>
      <DropDownContentContainer isOpen={isOpen}>
        {listToRender}
      </DropDownContentContainer>
    </DropDownContainer>
  );
};

export default React.memo(DropDown);
