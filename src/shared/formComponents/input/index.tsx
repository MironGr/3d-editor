import React from "react";
import { useField } from "formik";
import { 
  InputBase as InputMUI, 
  Select as SelectMUI,
  MenuItem,
} from '@mui/material';

import './styles.css';

import { TInput, TSelectOption } from "../../types";

type TInputProps = {
  name: string;
  type?: TInput;
  options?: TSelectOption[];
}

export const Input: React.FC<TInputProps> = ({
  type = "text",
  name,
  options,
}) => {
  const [field, meta] = useField(name);
  switch (type) {
    case "text":
      return <InputMUI
        {...field}
        className="input"
        inputProps={{ type: "number", pattern: "[0-9]*" }}
      />;
    case "select":
      return (
        <SelectMUI
          {...field}
          className="input"
          defaultValue={meta.initialValue || options?.[0].value}
          input={<InputMUI className="input" />}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectMUI>
      );

    default:
      return <InputMUI className="input" {...field} />;
  }
};