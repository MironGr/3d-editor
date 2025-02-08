import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Canvas } from '@react-three/fiber';

import { Primitive } from '../../shared/UI-kit/primitive';
import { List } from '../../shared/UI-kit/list';
import { AddPrimitiveGroup } from '../../widgets/addPrimitiveGroup';

import { ScaledCamera } from './scaledCamera';
import { Controls } from './controls';

import './styles.css';

const EditorComponent = () => {
  const [geometryList, setGeometryList] = useState<TPrimitive[]>([]);
  const [selectedGeometry, setSelectedGeometry] = useState<TPrimitive>();
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const onAddGroup = () => {
    setIsOpenSettings(!isOpenSettings);
  }

  const onClearScene = () => {
    setGeometryList([])
  }

  const scrollToIndex = (id: string) => {
    const element = document.getElementById(`list-item-${id}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <Box className="editor">
      <Box className="side-bar" p={2}>
        <Box>
          <Typography variant="h6">Geometry list</Typography>
          <Typography variant="caption">Click to focus on a primitive</Typography>
        </Box>
        <Box height={1} sx={{ overflowY: "scroll"}}>
          <List 
            items={geometryList} 
            selectedId={selectedGeometry?.id as string}
            onItemClick={setSelectedGeometry}
          />
        </Box>
        <Box display="flex" 
          sx={{ justifyContent: "space-between", gap: 2 }}
          pt={2}
        >
          <Button variant="outlined" color="secondary" onClick={onClearScene}>Clear scene</Button>
          <Button variant="contained" onClick={onAddGroup}>Add group</Button>
        </Box>
      </Box>

      {isOpenSettings && (
        <Box className="settings" p={2} sx={{ borderRightColor: "primary.main" }}>
          <AddPrimitiveGroup 
            onCancel={() => setIsOpenSettings(false)} 
            onAdd={(group) => setGeometryList(prev => [...prev, ...group])}
          />
        </Box>
      )}
      <Box flexGrow={1} p={2}>
        <Canvas>
          {geometryList.map((primitive, i) =>(
            <Primitive
              type={primitive.type}
              key={primitive.id}
              uuid={primitive.id}
              width={primitive.width} 
              height={primitive.height} 
              length={primitive.length} 
              position={[
                primitive.initRelativePosition?.[0] as number, 
                primitive.initRelativePosition?.[1] as number,
                primitive.initRelativePosition?.[2] as number,
              ]}
              isSelected={primitive.id === selectedGeometry?.id}
              onClick={() => {
                setSelectedGeometry(primitive)
                scrollToIndex(primitive.id)
              }}
            />
          ))}
          <Controls focusOn={selectedGeometry}/>
          <ScaledCamera primitives={geometryList} />
        </Canvas>
      </Box>
    </Box>
  );
}

export const Editor = EditorComponent;