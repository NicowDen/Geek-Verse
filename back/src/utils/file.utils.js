import path from "node:path";
import fs from "node:fs/promises";
import { log, logError } from "./logger.utils.js";

// const notes = '/users/joe/notes.txt';
// path.dirname(notes); // /users/joe
// path.basename(notes); // notes.txt
// path.extname(notes); // .txt

const makeDir = async (path) => {
  // path: './tmp/but/then/myFolder'
  try {
    await fs.access(path);
  } catch (e) {
    log("Try to create folder at ", path);
    await fs.mkdir(path, { recursive: true });
    log("Folder created");
  }
};

const moveFileOrCopy = async (oldPath, newPath) => {
  if (!oldPath || !newPath) throw new Error("nothing to move");
  await makeDir(path.dirname(newPath));

  try {
    await fs.rename(oldPath, newPath);
  } catch (e) {
    if (e.code !== "EXDEV") throw e;
    // Copy the file as a fallback
    await fs.copyFile(oldPath, newPath);
    // Remove the old file
    await fs.unlink(oldPath);
  }
};

const moveFile = async (oldPath, newPath) => {
  // const oldPath = "/path/to/file.txt";
  // const newPath = "/path/to/another/directory/file.txt";
  try {
    await moveFileOrCopy(oldPath, newPath);
    log("File moved successfully");
    return true;
  } catch (e) {
    logError(`file.utils - moveFile : ${e.message}`);
    return false;
  }
};

const removeFile = async (path) => {
  try {
    await fs.rm(path, { recursive: true, force: true });
  } catch (e) {
    logError(`file.utils - removeFile : ${e.message}`);
  }
};

export const FileUtils = { makeDir, moveFile, removeFile };
