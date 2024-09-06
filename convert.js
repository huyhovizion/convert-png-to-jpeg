const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'images');

async function convertPngToJpeg(filePath) {
  const jpegPath = filePath.replace('.png', '.jpeg');
  
  try {
    await sharp(filePath)
      .jpeg()
      .toFile(jpegPath);
    console.log(`Converted: ${filePath} -> ${jpegPath}`);
  } catch (err) {
    console.error(`Error converting ${filePath}:`, err);
  }
}

async function processImages() {
  let count = 0;
  
  const directories = await fs.readdir(imagesDir);

  for (const dir of directories) {
    const dirPath = path.join(imagesDir, dir);

    if (await fs.stat(dirPath).then(stat => stat.isDirectory())) {
      const files = await fs.readdir(dirPath);

      for (const file of files) {
        const filePath = path.join(dirPath, file);

        if (path.extname(file).toLowerCase() === '.png') {
          await convertPngToJpeg(filePath);
          count++;
        }
      }
    }
  }

  console.log(`Số ảnh đã convert: ${count}`);
}

processImages();
