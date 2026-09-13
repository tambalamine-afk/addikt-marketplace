// Compression des photos dans le navigateur avant l'envoi : une photo de téléphone
// (4 à 12 Mo) passe à quelques centaines de Ko, ce qui compte sur une connexion lente.

const MAX_INPUT_BYTES = 25 * 1024 * 1024;
const MAX_DIMENSION = 1600;
const QUALITY = 0.82;

export class ImageError extends Error {}

async function decode(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      // Respecte l'orientation EXIF des photos prises au téléphone
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      // Certains navigateurs refusent l'option : on retombe sur <img>
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function toBlob(canvas, type) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, QUALITY));
}

export async function compressImage(file) {
  if (!file.type.startsWith('image/')) {
    throw new ImageError(`« ${file.name} » n'est pas une image.`);
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new ImageError(`« ${file.name} » dépasse 25 Mo.`);
  }

  let source;
  try {
    source = await decode(file);
  } catch {
    throw new ImageError(`« ${file.name} » n'a pas pu être lue. Choisis une photo JPG, PNG ou WebP.`);
  }

  const width = source.naturalWidth || source.width;
  const height = source.naturalHeight || source.height;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const context = canvas.getContext('2d');
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  source.close?.();

  let blob = await toBlob(canvas, 'image/webp');
  let extension = 'webp';
  // Les navigateurs sans encodage WebP renvoient du PNG : on passe en JPEG
  if (!blob || blob.type !== 'image/webp') {
    blob = await toBlob(canvas, 'image/jpeg');
    extension = 'jpg';
  }
  if (!blob) {
    throw new ImageError(`« ${file.name} » n'a pas pu être préparée.`);
  }

  return { blob, extension, contentType: blob.type };
}

// Prépare les photos choisies une par une (moins de mémoire sur téléphone).
// Une photo illisible est ignorée et signalée, les autres sont conservées.
export async function prepareSelectedPhotos(files, onError) {
  const prepared = [];
  for (const file of files) {
    try {
      const { blob, extension, contentType } = await compressImage(file);
      prepared.push({ file: blob, extension, contentType, preview: URL.createObjectURL(blob) });
    } catch (err) {
      onError(err instanceof ImageError ? err.message : `« ${file.name} » n'a pas pu être préparée.`);
    }
  }
  return prepared;
}
