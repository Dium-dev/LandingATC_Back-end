export const createFileName = (username: string, fileName: string): string => {
  const fileExtension = fileName.split('.').pop();

  const usernameFix = username.split(' ').join('-').toLocaleLowerCase();

  return `${usernameFix}.${fileExtension}`;
};
