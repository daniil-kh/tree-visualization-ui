import React from "react";

import InputFieldContainer, { TextInput } from "./input-field.styled";

interface InputFieldProps {
  onChangeText: React.ChangeEventHandler;
  value?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  onChangeText,
  value,
}): JSX.Element => {
  return (
    <InputFieldContainer>
      <TextInput value={value} onChange={onChangeText} />
    </InputFieldContainer>
  );
};

export default React.memo(InputField);
