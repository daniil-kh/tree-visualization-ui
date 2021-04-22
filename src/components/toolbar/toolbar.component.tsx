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
  const [treeType, setTreeType] = useState("binary");

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
          const parsedInt = parseInt(numberToAdd, 10);
          if (parsedInt) addCallback(parsedInt);
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
          const parsedInt = parseInt(numberToDelete, 10);
          if (parsedInt) deleteCallback(parsedInt);
          setNumberToDelete("");
        }}
      />
      <DropDown
        title="Select tree"
        selected={treeType}
        list={[
          { name: "Binary Tree", value: "binary" },
          { name: "AVL Tree", value: "avl" },
          { name: "Red-Black Tree", value: "red-black" },
        ]}
        onSelect={(selected) => {
          setTreeType(selected);
          selectTreeCallback(selected);
        }}
      />
    </ToolbarContainer>
  );
};

export default React.memo(Toolbar);
