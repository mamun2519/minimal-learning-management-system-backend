import multer from "multer";

const UPLOAD_DIR = "uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const createMulterUpload = (fileFilter?: multer.Options["fileFilter"]) =>
  multer({ storage, fileFilter });

export const FileUploadConfig = {
  upload: createMulterUpload(),
};
