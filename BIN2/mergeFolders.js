const fs = require("node:fs/promises");
const fsSync = require("node:fs");
const path = require("node:path");

if (process.argv.slice(2).length < 3) {
  console.error(
    "Too few arguments for this script, expecting 'mergeFolder inputFolder1 inputFolder2 ... outputFolder'"
  );
  process.exit(1);
}

const arguments = process.argv.slice(2);

const inputFolders = arguments.slice(0, -1);
const outputFolder = arguments[arguments.length - 1];

async function checkOutputFolder() {
  // Check output folder exists and is empty and writable or not exists and parent folder is writable
  try {
    await fs.access(outputFolder, fs.constants.F_OK);
    try {
      await fs.access(
        outputFolder,
        fs.constants.R_OK | fs.constants.W_OK | fs.constants.X_OK
      );
      const files = await fs.readdir(outputFolder);
      if (files.length) {
        console.error("Output folder not empty");
        process.exit(2);
      }
    } catch (e) {
      console.error("Permission denied for output folder");
      process.exit(2);
    }
  } catch (e) {
    await fs.mkdir(outputFolder);
  }
}

const indexedFiles = {};

async function indexFolder(inputFolder) {
  const files = await fs.readdir(inputFolder);
  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(inputFolder, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        console.log(filePath, "is a directory");
        await indexFolder(filePath);
      } else {
        if (!indexedFiles[stat.size]) {
          indexedFiles[stat.size] = [];
        }
        indexedFiles[stat.size].push(filePath);
      }
    })
  );
}

async function removeDuplicateFiles(files) {
  const result = [];
  const duplicate = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (duplicate.includes(file)) continue;
    result.push(file);
    const fileBuffer = await fs.readFile(file);
    for (const fileToCompare of files.slice(i + 1)) {
      if (duplicate.includes(fileToCompare)) continue;
      const fileToCompareBuffer = await fs.readFile(fileToCompare);
      if (Buffer.compare(fileBuffer, fileToCompareBuffer) === 0) {
        duplicate.push(fileToCompare);
      }
    }
  }

  return result;
}

async function copyFile(file) {
  let filename = path.basename(file);
  const destFilePath = path.join(outputFolder, filename);
  try {
    fsSync.accessSync(destFilePath, fs.constants.F_OK);
    const ext = path.extname(filename);
    const realFilename = path.basename(filename, ext);
    filename = `${realFilename}_${Date.now()}${ext}`;
  } catch (e) {}
  fsSync.copyFileSync(file, path.join(outputFolder, filename));
}

async function processIndexedFiles() {
  return Promise.all(
    Object.entries(indexedFiles).map(async ([key, files]) => {
      if (files.length === 1) {
        const [file] = files;
        await copyFile(file);
      } else {
        const results = await removeDuplicateFiles(files);
        return Promise.all(results.map(copyFile));
      }
    })
  );
}

// Check input folders exists
Promise.all(
  inputFolders.map((inputFolder) =>
    fs.access(inputFolder, fs.constants.R_OK | fs.constants.X_OK)
  )
)
  .then(checkOutputFolder)
  .catch((e) => {
    console.error(e.message);
    process.exit(2);
  })
  .then(() => Promise.all(inputFolders.map(indexFolder)))
  .then(() => processIndexedFiles());
