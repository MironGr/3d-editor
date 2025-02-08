import React from "react";
import { Box, Typography } from '@mui/material';

import './styles.css';

import { Input } from "../input";
import { TInput, TSelectOption } from "../../types";

type TPropertyProps = {
  label: string;
  propertyName: string;
  type?: TInput;
  options?: TSelectOption[];
}

export const Property: React.FC<TPropertyProps> = ({
  label,
  propertyName,
  options,
  type = "text",
}) => {
  return <Box className="property" display="flex">
    <Typography className="label" variant="caption">{label}</Typography>
    <Input name={propertyName} type={type} options={options} />
  </Box>
};
