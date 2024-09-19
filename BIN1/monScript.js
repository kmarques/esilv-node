const fs = require("node:fs/promises");

if (process.argv.length < 3) {
  console.error("Usage: node monScript.js folderToWatch");
  process.exit(1);
}

const folderToWatch = process.argv[2];

async function checkFolderToWatchIsReadable(folderPath) {
  try {
    await fs.access(folderPath, fs.constants.R_OK | fs.constants.X_OK);
    return true;
  } catch (error) {
    return false;
  }
}

(async () => {
  if (!(await checkFolderToWatchIsReadable(folderToWatch))) {
    console.error("Permission denied or folderToWatch not exists");
    process.exit(1);
  }

  const watcher = fs.watch(folderToWatch);
  for await (const event of watcher) {
    console.log(event);
  }
})();
