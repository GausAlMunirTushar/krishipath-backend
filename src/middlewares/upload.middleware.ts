import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary";

// Function to create dynamic storage for any type of upload
const createStorage = (folder = "uploads") =>
	new CloudinaryStorage({
		cloudinary,
		params: async (req, file) => ({
			folder,
			allowed_formats: [
				"jpg",
				"jpeg",
				"png",
				"webp",
				"gif",
				"mp4",
				"mov",
			],
			resource_type: file.mimetype.startsWith("video/")
				? "video"
				: "image",
			public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
		}),
	});

/**
 * Multer middleware with optional folder name
 * @param folder Cloudinary folder name (default: "uploads")
 */
export const upload = (folder?: string) =>
	multer({ storage: createStorage(folder) });
