import { v2 as cloudinary } from "cloudinary";
import config from ".";
import multer from "multer";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name!,
  api_key: config.cloudinary.api_key!,
  api_secret: config.cloudinary.api_secret!,
});

const storage = multer.memoryStorage();

const createMulterUpload = (fileFilter?: multer.Options["fileFilter"]) =>
  multer({ storage, fileFilter });

export const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string = "uploads"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        if (error) reject(error);
        else
          resolve({
            url: result?.secure_url,
            public_id: result?.public_id,
            filename: result?.original_filename,
            size: result?.bytes,
            mimetype: file.mimetype,
          });
      }
    );

    uploadStream.end(file.buffer);
  });
};

export const FileUploadConfig = {
  upload: createMulterUpload(),
  uploadToCloudinary,
};

export default cloudinary;
