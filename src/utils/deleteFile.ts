import * as fs from 'fs/promises';

export const deleteFile = async (fileName: string) => {
  const filePath = `public/images/reviews/${fileName}`;
  await fs.rm(filePath).catch(() => {
    throw new Error(
      'Ocurrió un error en el servidor al intentar eliminar el archivo',
    );
  });
};
