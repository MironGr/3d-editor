export const pyramidEdgeOneVertices = [
  // Front side, 1 triangle: x, y, z
  -1, -1, -1,  0, 1, 0,  1, -1, 1,

  // Back side, 1 triangle: x, y, z
  1, -1, 1,  0, 1, 0,  1, -1, -1,

  // Left side, 1 triangle: x, y, z
  1, -1, -1,  0, 1, 0,  -1, -1, -1,

  // Bottom side, 1 triangle: x, y, z
  1, -1, 1,  1, -1, -1,  -1, -1, -1,
];

/** each side is two triangles */
export const boxEdgeOneVertices = [
  // Front side, 2 triangles: x, y, z
  -1, -1, 1,  1, -1, 1,  1, 1, 1,  
  -1, 1, 1,  -1, -1, 1,  1, 1, 1,

  // Back side, 2 triangles: x, y, z
  -1, -1, -1,  -1, 1, -1,  1, 1, -1,  
  1, -1, -1,  -1, -1, -1,  1, 1, -1,

  // Top side, 2 triangles: x, y, z
  -1, 1, -1,  -1, 1, 1,  1, 1, 1,
  1, 1, -1,  -1, 1, -1,  1, 1, 1,

  // Bottom side, 2 triangles: x, y, z
  -1, -1, -1,  1, -1, -1,  1, -1, 1,
  -1, -1, 1,  -1, -1, -1,  1, -1, 1,

  // Left side, 2 triangles: x, y, z
  -1, -1, -1,  -1, -1, 1,  -1, 1, 1,
  -1, 1, -1,  -1, -1, -1,  -1, 1, 1,

  // Right side, 2 triangles: x, y, z
  1, -1, -1,  1, 1, -1,  1, 1, 1,  
  1, -1, 1,  1, -1, -1,  1, 1, 1,
];