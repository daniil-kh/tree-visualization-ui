import React, { useState } from "react";

import Button from "../button/button.component";
import InputField from "../input-field/input-field.component";
import ToolbarContainer from "./toolbar.styled";

interface ToolbarProps {
  addCallback: Function;
  deleteCallback: Function;
}

const Toolbar: React.FC<ToolbarProps> = ({
  addCallback,
  deleteCallback,
}): JSX.Element => {
  const [numberToAdd, setNumberToAdd] = useState("");
  const [numberToDelete, setNumberToDelete] = useState("");

  return (
    <ToolbarContainer>
      <InputField
        value={numberToAdd}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) => {
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
    </ToolbarContainer>
  );
};

export default Toolbar;
