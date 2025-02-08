import React from "react";
import { List as ListMUI } from '@mui/material';

import { Item } from "./item";

type TListProps = {
  items: any[];
  selectedId: string;
  onItemClick: (item: TPrimitive) => void;
}

export const List = ({
  items,
  selectedId,
  onItemClick,
}: TListProps) => {
  return (
    <ListMUI>
      {items.map((item, index) => <Item 
        key={item.id}
        index={index}
        isSelected={item.id === selectedId}
        id={item.id}
        name={item.type} 
        position={item.initRelativePosition}
        color={item.color}
        onClick={() => onItemClick(item)}
      />)}
    </ListMUI>
  );
};
