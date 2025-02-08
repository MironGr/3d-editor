import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


export const Controls = ({
  focusOn
}: {
  focusOn?: TPrimitive,
}) => {
  const { camera } = useThree();

  useEffect(() => {
    if (focusOn?.initRelativePosition) {
      const distance = Math.max(focusOn.height, focusOn.length, focusOn.width)

      const newPosition = focusOn.initRelativePosition.map((position: number) => {
        if (position > 0) return position + distance;
        else return position - distance;
      })
      camera.position.set(newPosition[0], newPosition[1], newPosition[2]);
      camera.updateProjectionMatrix();
    }

  }, [camera, focusOn])

  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
      <OrbitControls 
        enableZoom={true}
        minDistance={5} 
        maxDistance={700}
      />
    </>
  );
};