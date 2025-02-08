declare type TPrimitiveType = 'box' | 'pyramid';

declare type TPrimitive = {
  id: string;
  type: TPrimitiveType;
  width: number;
  height: number;
  length: number;
  initRelativePosition?: number[];
}