import * as fs from 'fs/promises';

export const renameFile = async (oldName: string, newName: string) => {
  const oldPath = `public/images/reviews/${oldName}`;
  const newPath = `public/images/reviews/${newName}`;

  await fs.rename(oldPath, newPath).catch(() => {
    throw new Error(
      'Ocurrió un error en el servidor al intentar renombrar el archivo',
    );
  });
};
