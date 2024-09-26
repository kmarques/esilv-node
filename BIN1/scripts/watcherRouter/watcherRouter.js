const fs = require("node:fs/promises");
const path = require("node:path");

if (process.argv.length < 3) {
  console.error("Usage: node monScript.js folderToWatch");
  process.exit(1);
}

const folderToWatch = process.argv[2];
const destFolder = process.argv[3];

async function checkFolderToWatchIsReadable(folderPath) {
  try {
    await fs.access(folderPath, fs.constants.R_OK | fs.constants.X_OK);
    return true;
  } catch (error) {
    return false;
  }
}

async function checkDestFolder(folderPath) {
  try {
    await fs.access(folderPath, fs.constants.F_OK);
    try {
      await fs.access(
        folderPath,
        fs.constants.R_OK | fs.constants.X_OK | fs.constants.W_OK
      );
    } catch (e) {
      return false;
    }
  } catch (error) {
    await fs.mkdir(folderPath);
  }
  return true;
}

async function routeFile(filepath) {
  try {
    await fs.access(filepath, fs.constants.F_OK);
  } catch (e) {
    return;
  }
  const filename = path.basename(filepath);
  const ext = path.extname(filename).slice(1) || "unknown";
  const destination = path.join(destFolder, ext);
  try {
    await fs.access(destination, fs.constants.F_OK);
  } catch (e) {
    await fs.mkdir(destination);
  }
  await fs.rename(filepath, path.join(destination, filename));
}

(async () => {
  if (!(await checkFolderToWatchIsReadable(folderToWatch))) {
    console.error("Permission denied or folderToWatch not exists");
    process.exit(1);
  }

  if (!(await checkDestFolder(destFolder))) {
    console.error("Permission denied for destFolder");
    process.exit(1);
  }

  const watcher = fs.watch(folderToWatch);
  for await (const event of watcher) {
    if (event.eventType !== "rename") continue;
    await routeFile(path.join(folderToWatch, event.filename));
  }
})();
