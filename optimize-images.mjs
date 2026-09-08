import fs from "fs";
import path from "path";
import sharp from "sharp";

const folders = ["public/images/projects", "public/images/ai-projects"];

const getPngFiles = (directory) => {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getPngFiles(fullPath);
    }

    if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".png") {
      return [fullPath];
    }

    return [];
  });
};

const files = folders.flatMap((folder) => getPngFiles(folder));

for (const file of files) {
  const output = file.replace(/\.png$/i, ".webp");

  await sharp(file)
    .webp({
      quality: 92,
      smartSubsample: true,
    })
    .toFile(output);

  const originalSize = fs.statSync(file).size;
  const newSize = fs.statSync(output).size;

  console.log(
    `${file} | ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(newSize / 1024 / 1024).toFixed(2)} MB`,
  );
}
