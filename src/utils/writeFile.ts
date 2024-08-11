import * as fs from 'fs/promises';
import { createFileName } from './createFileName';

export const writeFile = async (
  username: string,
  image: Express.Multer.File,
) => {
  const fileName = createFileName(username, image.originalname);
  const filePath = `public/images/reviews/${fileName}`;

  await fs.writeFile(filePath, image.buffer).catch(() => {
    throw new Error(
      'Ocurrió un error en el servidor al intentar crear la nueva reseña',
    );
  });

  return fileName;
};
