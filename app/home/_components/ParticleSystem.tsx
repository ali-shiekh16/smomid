import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import particleVertexShader from '../_shaders/Vertex';
import particleFragmentShader from '../_shaders/Fragment';
import { extractParticlesData } from '../_utils';

interface ParticleSystemProps {
  texturePath: string;
  meshRef?: React.Ref<THREE.Points>;
  materialRef?: React.Ref<THREE.ShaderMaterial>;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  texturePath,
  meshRef,
  materialRef,
}) => {
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const particlesData = useMemo(() => extractParticlesData(texture), [texture]);

  // Animate time uniform
  useFrame(state => {
    if (materialRef && 'current' in materialRef && materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <points ref={meshRef}>
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
};

export default ParticleSystem;
