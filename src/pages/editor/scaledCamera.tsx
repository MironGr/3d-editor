import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export const ScaledCamera = ({ primitives }: { primitives: any }) => {
  const { camera } = useThree();

  useEffect(() => {
    const calculateMaxDistance = () => {
      let maxDist = 0;
      for (let primitive of primitives) {
        const { width, height, length, initRelativePosition } = primitive;

        const distanceCenterToPrimitive = new Vector3(0, 0, 0)
          .distanceTo(new Vector3(
            ...initRelativePosition.map((center: number) => center + Math.max(width, height, length))
          ));
        const distanceCenterToCamera = new Vector3(0, 0, 0).distanceTo(camera.position);
        maxDist = Math.max(distanceCenterToCamera, distanceCenterToPrimitive);
      }
      return maxDist;
    };

    const maxDistance = calculateMaxDistance();

    /** move camera by z-coodinate */
    if (camera.position.z < maxDistance) {
      camera.position.z = maxDistance * 2;
      camera.updateProjectionMatrix();
    }

  }, [camera, camera.position, primitives]);

  return null;
};
