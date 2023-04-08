const fs = require("node:fs");
const path = require("node:path");

const FileType = {
  directory: "directory",
  file: "file",
  sourceMap: ".map",
  unknown: "unknown",
};

const getFileType = (path) => {
  try {
    const stat = fs.statSync(path);

    if (stat.isFile()) {
      return FileType.file;
    }

    if (stat.isDirectory()) {
      return FileType.directory;
    }

    return FileType.unknown;
  } catch (e) {
    return FileType.unknown;
  }
};

const getFileList = (dirPath) => {
  const ret = [];
  const paths = fs.readdirSync(dirPath);
  paths.forEach((p) => {
    const filePath = path.resolve(dirPath, p);

    if (getFileType(filePath) === FileType.file) {
      ret.push(filePath);
    }

    if (getFileType(filePath) === FileType.directory) {
      ret.push(...getFileList(filePath));
    }

    return;
  });

  return ret;
};

const sourceMapFileList = getFileList("./.next/static").filter((p) => path.extname(p) === FileType.sourceMap);
sourceMapFileList.forEach((filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
});
