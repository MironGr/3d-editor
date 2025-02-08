import React, { memo, useRef, useState, useEffect } from 'react';
import { 
  BufferGeometry, 
  Float32BufferAttribute, 
  Mesh, 
  MeshBasicMaterial,
  Color,
} from 'three';
import { ThreeElements } from '@react-three/fiber';

import { 
  pyramidEdgeOneVertices, 
  boxEdgeOneVertices,
} from './primitiveFrames';

const frames = {
  box: {
    frame: boxEdgeOneVertices,
    verticesSide: 6,
  },
  pyramid: {
    frame: pyramidEdgeOneVertices,
    verticesSide: 3,
  }
} 

class PrimitiveGeometry extends BufferGeometry {
  constructor(frame: number[], width: number, height: number, length: number) {
    super();

    const hw = width / 2;
    const hh = height / 2;
    const hl = length / 2;

    const vertices = [];

    for (let i = 0; i < frame.length; i += 3) {
      vertices[i] = frame[i] * hw;
      vertices[i + 1] = frame[i + 1] * hh;
      vertices[i + 2] = frame[i + 2] * hl;
    }

    this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    this.computeVertexNormals();
  }
}

type TPrimitiveProps = {
  type: keyof typeof frames;
  width: number,
  height: number,
  length: number,
  isSelected: boolean;
  onClick: () => void,
}

const PrimitiveComponent = ({
  type,
  uuid,
  width,
  height,
  length,
  isSelected,
  onClick,
  ...props
}: TPrimitiveProps & ThreeElements['mesh']) => {
  const meshRef = useRef<Mesh>(null!)
  const [hovered, setHover] = useState(false)

  const [colors, setColors] = useState<number[]>([])
  const [colorsHovered, setColorsHovered] = useState<number[]>([])
  
  /** add colors for each side */
  useEffect(() => {
    const randomColors = []
    const colorsHovered = [];
    const color = new Color();

    for (let i = 0; i < pyramidEdgeOneVertices.length; i += frames[type].verticesSide) {
      color.setHex(Math.random() * 0xffffff);
      randomColors.push(
        ...new Array(frames[type].verticesSide)
          .fill(null)
          .map(() => [color.r, color.g, color.b])
          .flat()
      )
      colorsHovered.push(
        ...new Array(frames[type].verticesSide)
          .fill(null)
          .map(() => [color.setHex(0xf411f7).r, color.setHex(0xf411f7).g, color.setHex(0xf411f7).b])
          .flat()
      )
    }
    setColors(randomColors)
    setColorsHovered(colorsHovered)
  }, [type])

  const geometry = new PrimitiveGeometry(frames[type].frame, width, height, length);
  geometry.setAttribute('color', (hovered || isSelected)
    ? new Float32BufferAttribute(colorsHovered, 3) 
    : new Float32BufferAttribute(colors, 3));

  const materialRef = useRef(new MeshBasicMaterial({ vertexColors: true }));
  
  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={() => onClick()}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      geometry={geometry}
      material={materialRef.current}
    />
  );
};

export const Primitive = memo(PrimitiveComponent);
