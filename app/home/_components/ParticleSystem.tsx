import React, { useRef, useMemo, forwardRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLoader, useThree, useFrame } from '@react-three/fiber'; // Import useThree and useFrame
import particleVertexShader from '../_shaders/Vertex';
// Assume particleFragmentShader is now the updated version from step 1
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

    // Get viewport information from useThree
    const { size } = useThree(); // size contains { width, height } of the canvas

    const particlesData = useMemo(
      () => extractParticlesData(texture),
      [texture]
    );

    // Memoize uniforms to prevent recreation on every render
    const uniforms = useMemo(
      () => ({
        time: { value: 0 },
        dispersion: { value: 0 },
        pointTexture: { value: texture },
        // Initialize u_resolution uniform
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      }),
      [texture, size.width, size.height]
    ); // Add size dependencies

    // Effect to call onInit
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
    }, [size]); // Run when size changes

    // Optional: useFrame to update time uniform if needed for other effects
    // useFrame((state) => {
    //   if (materialRef.current) {
    //     materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    //   }
    // });

    return (
      <points ref={ref} position={[0, 0, -20]}>
        <bufferGeometry>
          {/* BufferAttributes remain the same*/}
          <bufferAttribute
            attach='attributes-position'
            args={[particlesData.positions, 3]}
            count={particlesData.positions.length / 3}
            itemSize={3} // Explicitly setting itemSize is good practice
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
        {/* Use the memoized uniforms object */}
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms} // Pass the uniforms object
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader} // Make sure this uses the updated shader code
          transparent={true} // Crucial for alpha blending
          alphaTest={0.0} // Ensure alphaTest doesn't discard pixels prematurely
          depthWrite={false} // Usually needed for transparent particles
        />
      </points>
    );
  }
);

ParticleSystem.displayName = 'ParticleSystem';
export default ParticleSystem;
