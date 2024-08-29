import { readdir } from "node:fs/promises";

export default async function (ostarbaiter) {
  const result = {};
  const path = `uploads/${ostarbaiter.id}`;
  try {
    const directories = await readdir(path);
    await Promise.all(
      directories.map(async (directory) => {
        if (directory !== "images") {
          const files = await readdir(`${path}/${directory}`);
          const pathDirectoryFiles = [];
          files.map((file) =>
            pathDirectoryFiles.push(`${path}/${directory}/${file}`)
          );
          result[directory] = pathDirectoryFiles;
        }
      })
    );
    return result;
  } catch (e) {
    return null;
  }
}

export async function cdnUrlImg(ostarbaiter) {
  const fullname = [
    ostarbaiter.surname.trim(),
    ostarbaiter?.name?.trim(),
    ostarbaiter?.patronymic?.trim(),
  ].join("");
  const path = `uploads/${ostarbaiter.id}/images`;
  const result = [];
  try {
    const files = await readdir(path);
    await Promise.all(
      files.map(async (file) => {
        result.push(`${path}/${file}`);
      })
    );
  } catch (e) {
    return null;
  }
  return result.toString();
}
