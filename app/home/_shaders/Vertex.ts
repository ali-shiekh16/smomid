// Vertex Shader
// Vertex Shader
const particleVertexShader = `
uniform float time;
uniform float dispersion;
uniform float u_size;
uniform float u_density;

attribute float size;
attribute vec3 customColor;
attribute vec3 initialPosition;

varying vec3 vColor;
varying vec2 vUv;
varying float vVisible;

// High-quality hash function for randomness
float hash(vec3 p) {
    p = fract(p * vec3(123.34, 456.21, 789.12));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y * p.z);
}

void main() {
    vColor = customColor;
    vUv = uv;

    float particleRandomValue = hash(initialPosition + vec3(time * 0.01));
    vVisible = step(1.0 - u_density, particleRandomValue);
    
    // Skip processing invisible particles (optimization)
    // if (vVisible < 0.5) {
    //     gl_Position = vec4(2.0, 2.0, 2.0, 1.0); // Off-screen
    //     gl_PointSize = 0.0;
    //     return;
    // }
    
    // Generate completely random displacement for every particle
    vec3 randomDisplacement = vec3(
        (hash(initialPosition + vec3(1.0, 0.0, 0.0)) * 2.0 - 1.0) * 20.0,
        (hash(initialPosition + vec3(0.0, 1.0, 0.0)) * 2.0 - 1.0) * 20.0,
        5.
        // (hash(initialPosition + vec3(0.0, 0.0, 1.0)) * 2.0 - 1.0) * 20.0
    );
    
    // Ensure every particle moves, scaled by dispersion
    vec3 transformed = mix(initialPosition, initialPosition + randomDisplacement, dispersion);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_PointSize = u_size * size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

export default particleVertexShader;
