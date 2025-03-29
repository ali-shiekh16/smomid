import React, { useRef, useMemo, forwardRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import particleVertexShader from '../_shaders/Vertex';
import particleFragmentShader from '../_shaders/Fragment';
import { extractParticlesData } from '../_utils';

interface ParticleSystemProps {
  texturePath: string;
  onInit?: (mesh: THREE.Points, material: THREE.ShaderMaterial) => void;
}

const ParticleSystem = forwardRef<THREE.Points, ParticleSystemProps>(
  ({ texturePath, onInit }, ref) => {
    const texture = useLoader(THREE.TextureLoader, texturePath);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const particlesData = useMemo(
      () => extractParticlesData(texture),
      [texture]
    );

    // After initial render, call onInit if provided
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

    return (
      <points ref={ref} position={[0, 0, -20]}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            args={[particlesData.positions, 3]}
            count={particlesData.positions.length / 3}
          />
          <bufferAttribute
            attach='attributes-initialPosition'
            args={[particlesData.initialPositions, 3]}
            count={particlesData.initialPositions.length / 3}
          />
          <bufferAttribute
            attach='attributes-customColor'
            args={[particlesData.colors, 3]}
            count={particlesData.colors.length / 3}
          />
          <bufferAttribute
            attach='attributes-size'
            args={[particlesData.sizes, 1]}
            count={particlesData.sizes.length}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            time: { value: 0 },
            dispersion: { value: 0 },
            pointTexture: { value: texture },
          }}
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          transparent={true}
          alphaTest={0}
          depthWrite={false}
        />
      </points>
    );
  }
);

ParticleSystem.displayName = 'ParticleSystem';
export default ParticleSystem;
