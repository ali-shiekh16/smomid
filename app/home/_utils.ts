import { Texture } from 'three';

const extractParticlesData = (texture: Texture, step = 5) => {
  // Create a canvas to process the image
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!texture.image) {
    console.error('Texture image not loaded');
    return {
      positions: new Float32Array(0),
      colors: new Float32Array(0),
      sizes: new Float32Array(0),
      initialPositions: new Float32Array(0),
    };
  }

  canvas.width = texture.image.width;
  canvas.height = texture.image.height;
  context?.drawImage(texture.image, 0, 0, canvas.width, canvas.height);

  const imageData = context?.getImageData(0, 0, canvas.width, canvas.height);
  const particles: { positions: number[]; colors: number[] }[] = [];

  if (imageData) {
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4;
        const r = imageData.data[index] / 255;
        const g = imageData.data[index + 1] / 255;
        const b = imageData.data[index + 2] / 255;

        // Check if pixel is white or near-white
        if (r > 0.99 && g > 0.99 && b > 0.99) {
          // Normalize coordinates to -1 to 1 range
          const normalizedX = (x / canvas.width) * 2 - 1;
          const normalizedY = -((y / canvas.height) * 2 - 1);

          particles.push({
            positions: [normalizedX * 10, normalizedY * 10, 0],
            colors: [r, g, b],
          });
        }
      }
    }
  }

  // Convert to typed arrays
  const positions = new Float32Array(particles.length * 3);
  const colors = new Float32Array(particles.length * 3);
  const sizes = new Float32Array(particles.length);
  const initialPositions = new Float32Array(particles.length * 3);

  particles.forEach((particle, i) => {
    positions[i * 3] = particle.positions[0];
    positions[i * 3 + 1] = particle.positions[1];
    positions[i * 3 + 2] = particle.positions[2];

    initialPositions[i * 3] = particle.positions[0];
    initialPositions[i * 3 + 1] = particle.positions[1];
    initialPositions[i * 3 + 2] = particle.positions[2];

    colors[i * 3] = particle.colors[0];
    colors[i * 3 + 1] = particle.colors[1];
    colors[i * 3 + 2] = particle.colors[2];

    // Adjust size for density
    sizes[i] = 1;
  });

  return { positions, colors, sizes, initialPositions };
};

export { extractParticlesData };
