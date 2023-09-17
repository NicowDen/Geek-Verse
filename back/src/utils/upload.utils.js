import multer from "multer";
import * as path from "path";
import { logError } from "./logger.utils.js";

export const UPLOAD_PATH = `${process.cwd()}/public/uploads/`;

const getImageFilter = () => (req, file, callback) => {
  const { originalname, mimetype } = file;

  const extensions = [".png", ".jpg", ".jpeg"];
  const types = ["image/png", "image/jpg", "image/jpeg"];

  const fileExt = path.extname(originalname).toLowerCase();

  const extIsOk = extensions.includes(fileExt);
  const mimeIsOk = types.includes(mimetype);

  if (extIsOk && mimeIsOk) return callback(null, true);

  const error = `Invalid file type. Only picture file on type PNG and JPG are allowed !`;
  callback(new Error(error));
};

const getUploadOptions = (fieldname, destination, fileSize, filter) => {
  const storage = multer.diskStorage({
    destination: `${UPLOAD_PATH}${destination || ""}`,
    filename(req, file, callback) {
      const { fieldname, originalname } = file;
      const date = new Date().getTime().toString();
      const name = `${date}-${fieldname}${path.extname(originalname)}`;
      callback(null, name);
    },
  });

  const limits = { fileSize: (fileSize || 5) * 1024 * 1024 }; // 5mb
  filter = filter || ((req, file, callback) => callback(null, true));
  return { fieldname, storage, limits, filter };
};

const saveOneImage = async (req, res, options) => {
  const { fieldname, storage, limits, filter } = options;

  const saveOneImageMiddleware = multer({
    storage,
    limits,
    fileFilter: filter,
  }).single(fieldname);

  const saveOneImagePromise = async (req, res) => {
    return new Promise((resolve, reject) => {
      const afterSave = (error) => {
        if (error) reject(error);
        resolve({ file: req.file, body: req.body });
      };

      saveOneImageMiddleware(req, res, afterSave);
    });
  };

  try {
    const result = await saveOneImagePromise(req, res);
    return result;
  } catch (e) {
    logError(e.message);
    return null;
  }
};

export const UploadUtils = { saveOneImage, getImageFilter, getUploadOptions };
