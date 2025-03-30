// Fragment Shader (remains the same)
const particleFragmentShader = `
 
  uniform sampler2D pointTexture;
  varying vec3 vColor;
  varying vec2 vUv;

  void main() {
    // Create a soft circular particle
    vec2 centered = gl_PointCoord - vec2(0.5);
    float dist = length(centered);
    float alpha = smoothstep(0.3, 0.0, dist);

    // Sample the color directly from the texture
    vec4 textureColor = texture2D(pointTexture, vUv);

    // Use the texture color, with soft circular alpha
    gl_FragColor = vec4(vec3(1.), alpha);
  }

`;

export default particleFragmentShader;

// // Uniforms
// uniform sampler2D pointTexture;
// uniform vec2 u_resolution; // Canvas resolution (width, height)

// // Varyings
// varying vec3 vColor; // Still unused in original logic, but declared
// varying vec2 vUv;

// void main() {
//   // Particle's own circular alpha mask
//   vec2 centered = gl_PointCoord - vec2(0.5);
//   float dist = length(centered);
//   float particleAlpha = smoothstep(0.5, 0.45, dist); // Adjust smoothness as needed

//   // --- Edge Fade Logic using gl_FragCoord ---
//   // Calculate normalized screen coordinates (0.0 to 1.0)
//   vec2 screenUv = gl_FragCoord.xy / u_resolution.xy;

//   // Calculate distance from the center of the screen (0.5, 0.5)
//   float distFromCenterX = abs(screenUv.x - 0.5) * 2.0; // Range 0 (center) to 1 (edge)
//   float distFromCenterY = abs(screenUv.y - 0.5) * 2.0; // Range 0 (center) to 1 (edge)
//   float maxDistFromCenter = max(distFromCenterX, distFromCenterY); // Max distance

//   // Define the fade region (start fading at 80% distance from center)
//   float fadeStart = 0.8;
//   float fadeEnd = 1.0; // Fully faded at the edge
//   float edgeFadeAlpha = smoothstep(fadeEnd, fadeStart, maxDistFromCenter);
//   // -------------------------------------------

//   // Combine particle alpha and edge fade alpha
//   float finalAlpha = particleAlpha * edgeFadeAlpha;

//   // Use the original color logic (white) or textureColor if intended
//   gl_FragColor = vec4(vec3(1.0), finalAlpha);
// }

// const particleFragmentShader = `
//   uniform sampler2D pointTexture;
//   varying vec3 vColor;
//   varying vec2 vUv;

//   void main() {
//     // Create a soft circular particle
//     vec2 centered = gl_PointCoord - vec2(0.5);
//     float dist = length(centered);
//     float alpha = smoothstep(0.3, 0.0, dist);

//     // Sample the color directly from the texture
//     vec4 textureColor = texture2D(pointTexture, vUv);

//     // Use the texture color, with soft circular alpha
//     gl_FragColor = vec4(vec3(1.), alpha);
//   }
// `;
