import * as fs from 'fs/promises';

export const deleteFile = async (filePath: string) => {
  await fs.rm(filePath).catch(() => {
    throw new Error(
      'Ocurrió un error en el servidor al intentar eliminar la reseña',
    );
  });
};
