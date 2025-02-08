import React from "react";
import { Formik } from "formik";
import { v4 as uuidv4 } from 'uuid';
import { Box, Typography, Button, Divider } from '@mui/material';

import { Property } from '../../shared/formComponents/property';

const primitiveList = [
  { value: 'box', label: 'Box' },
  { value: 'pyramid', label: 'Pyramid' },
]

type TAddPrimitiveGroupProps = {
  onCancel: () => void;
  onAdd: (args: TPrimitive[]) => void;
}

const AddPrimitiveGroupComponent: React.FC<TAddPrimitiveGroupProps> = ({
  onCancel,
  onAdd,
}) => {
  return <Formik
    initialValues={{ 
      type: "box" as TPrimitiveType, 
      width: 10, 
      height: 10, 
      length: 10, 
      number: 5 
    }}
    validate={(values) => {
      const errors = {};
      // @ts-ignore
      if (values.width <= 0 || values.width > 100) errors.width = "Width must be (0, 100]";
      // @ts-ignore
      if (values.height <= 0 || values.height > 100) errors.height = "Height must be (0, 100]";
      // @ts-ignore
      if (values.length <= 0 || values.length > 100) errors.length = "Length must be (0, 100]";
      // @ts-ignore
      if (values.number <= 0 || values.number > 100) errors.number = "Number must be (0, 100]";
      return errors
    }}
    onSubmit={async (values) => {
      onCancel();
      const group: TPrimitive[] = []
      for (let i = 0; i < values.number; i++) {
        const { type, width, height, length } = values;
        const groupParams: TPrimitive = {
          id: uuidv4(),
          type, 
          width, 
          height, 
          length,
          /** distance is relative to max size */
          initRelativePosition: new Array(3)
            .fill(null)
            .map(() => Number(
              (3 * ((Math.random() * 2 - 1) * Math.max(width, height, length))).toFixed(1))
            ),
        };
        group.push(groupParams);
      }
      onAdd(group);
    }}
  >
    {({ errors, handleSubmit, isSubmitting }) => (
      <form
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Add primitives group</Typography>
        <Divider sx={{ mb: 2}} />
        <Box display="flex" gap={2} flexDirection="column" sx={{ mb: 2}}>
          <Property
            label="Type" 
            propertyName="type" 
            type="select" 
            options={primitiveList}
          />
          <Property label="Length" propertyName="length" />
          <Property label="Width" propertyName="width" />
          <Property label="Height" propertyName="height" />
          <Property label="Number" propertyName="number" />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            OK
          </Button>
        </Box>
        <Box>
          {Object.values(errors).map((error, i) => (
            <>
              <Typography key={error} variant="caption" color="red">{i + 1} - {error}</Typography>
              <br />
            </>
          ))}
        </Box>
      </form>)}
  </Formik>
}

export const AddPrimitiveGroup = AddPrimitiveGroupComponent;