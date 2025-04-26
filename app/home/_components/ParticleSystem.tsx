import React, {
  useRef,
  useMemo,
  forwardRef,
  useEffect,
  JSX,
  useState,
} from 'react';
import * as THREE from 'three';
import { useLoader, useThree } from '@react-three/fiber';
import particleVertexShader from '../_shaders/Vertex';
import particleFragmentShader from '../_shaders/Fragment';
import { extractParticlesData } from '../_utils';

type MeshProps = JSX.IntrinsicElements['points'];

interface Props extends MeshProps {
  texturePath: string;
  onInit?: (mesh: THREE.Points, material: THREE.ShaderMaterial) => void;
  step?: number;
  particleSize?: number;
}

const ParticleSystem = forwardRef<THREE.Points, Props>(
  ({ texturePath, onInit, step = 5, particleSize = 1, ...props }, ref) => {
    const [isMobile, setIsMobile] = useState(false);
    const texture = useLoader(THREE.TextureLoader, texturePath);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const { size } = useThree();

    const particlesData = useMemo(
      () => extractParticlesData(texture, step),
      [texture]
    );

    const uniforms = useMemo(
      () => ({
        time: { value: 0 },
        dispersion: { value: 0 },
        pointTexture: { value: texture },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        u_opacity: { value: 1 },
        u_size: { value: particleSize },
        u_density: { value: 1 },
      }),
      [texture, size.width, size.height]
    );

    useEffect(() => {
      if (
        ref &&
        'current' in ref &&
        ref.current &&
        materialRef.current &&
        onInit
      ) {
        onInit(ref.current, materialRef.current);
      }
    }, [ref, onInit]);

    // Effect to update resolution uniform on resize
    useEffect(() => {
      if (materialRef.current) {
        materialRef.current.uniforms.u_resolution.value.set(
          size.width,
          size.height
        );
      }

      if (size.width < 768) setIsMobile(true);
    }, [size]);

    const x = isMobile ? 1 : 0;

    return (
      <points ref={ref} position={[x, 0, -20]} {...props}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            args={[particlesData.positions, 3]}
            count={particlesData.positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-initialPosition'
            args={[particlesData.initialPositions, 3]}
            count={particlesData.initialPositions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-customColor'
            args={[particlesData.colors, 3]}
            count={particlesData.colors.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach='attributes-size'
            args={[particlesData.sizes, 1]}
            count={particlesData.sizes.length}
            itemSize={1}
          />
        </bufferGeometry>

        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          transparent={true}
          alphaTest={0.0}
          depthWrite={false}
        />
      </points>
    );
  }
);

ParticleSystem.displayName = 'ParticleSystem';
export default ParticleSystem;
