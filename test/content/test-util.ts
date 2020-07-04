type Attrs = {
  width?: string;
  height?: string;
  style?: string;
};

export async function createImg([width, height]: [number, number], attrs: Attrs): Promise<HTMLImageElement> {
  const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"></svg>`;
  const img = new Image();
  img.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;

  Object.entries(attrs).forEach(([name, value]) => {
    if (value !== undefined) img.setAttribute(name, value);
  });
  document.body.appendChild(img); // force to render img element

  return new Promise((resolve) => {
    img.onload = () => {
      resolve(img);
    };
  });
}
