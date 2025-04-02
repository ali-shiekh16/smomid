const particleFragmentShader = `
 
  uniform sampler2D pointTexture;
  uniform float u_opacity;
  
  varying vec3 vColor;
  varying vec2 vUv;

  void main() {
    // Create a soft circular particle
    vec2 centered = gl_PointCoord - vec2(0.5);
    float dist = length(centered);
    // float alpha = smoothstep(0.3, 0.0, dist);
    float alpha = step(0.2, dist);
    alpha = 1.0 - alpha; // Invert the alpha to create a soft edge

    // Sample the color directly from the texture
    vec4 textureColor = texture2D(pointTexture, vUv);

    // Use the texture color, with soft circular alpha
    gl_FragColor = vec4(vec3(1.), alpha * u_opacity);
  }

`;

export default particleFragmentShader;
