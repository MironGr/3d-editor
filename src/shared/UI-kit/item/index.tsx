import React, { memo } from "react";
import { Box, ListItem, ListItemText } from '@mui/material';

import './styles.css';

type TItemProps = {
  index: number;
  id: string;
  name: string; 
  position: number[];
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const ItemComponent = ({
  index,
  id,
  name,
  position,
  color,
  isSelected,
  onClick,
}: TItemProps) => {
  return (
    <ListItem
      id={`list-item-${id}`}
      className="item"
      sx={{
        backgroundColor: isSelected ? 'rgba(26, 26, 239, 0.51)' : 'white',
      }}
      onClick={onClick}
    >
      <Box>
        <ListItemText sx={{ textTransform: 'capitalize' }}>{index} - {name}</ListItemText>
        <ListItemText>position ({position[0]}; {position[1]}; {position[2]})</ListItemText>
      </Box>
      <Box bgcolor={color} width={20} height={20} />
    </ListItem>
  );
}

export const Item = memo(ItemComponent);