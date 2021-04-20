import React, { useState } from "react";

import Button from "../button/button.component";
import InputField from "../input-field/input-field.component";
import ToolbarContainer from "./toolbar.styled";
import DropDown from "../drop-down/drop-down.component";

interface ToolbarProps {
  addCallback: Function;
  deleteCallback: Function;
  selectTreeCallback: Function;
}

const Toolbar: React.FC<ToolbarProps> = ({
  addCallback,
  deleteCallback,
  selectTreeCallback,
}): JSX.Element => {
  const [numberToAdd, setNumberToAdd] = useState("");
  const [numberToDelete, setNumberToDelete] = useState("");

  return (
    <ToolbarContainer>
      <InputField
        value={numberToAdd}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setNumberToAdd(e.target.value);
        }}
      />
      <Button
        title="Add"
        onClick={() => {
          addCallback(parseInt(numberToAdd, 10));
          setNumberToAdd("");
        }}
      />
      <InputField
        value={numberToDelete}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          setNumberToDelete(e.target.value);
        }}
      />
      <Button
        title="Delete"
        onClick={() => {
          deleteCallback(parseInt(numberToDelete, 10));
          setNumberToDelete("");
        }}
      />
      <DropDown
        title="Select tree"
        list={[
          { name: "Binary Tree", value: "binary" },
          { name: "AVL Tree", value: "avl" },
          { name: "Red-Black Tree", value: "red-black" },
        ]}
        onSelect={() => {}}
      />
    </ToolbarContainer>
  );
};

export default React.memo(Toolbar);
