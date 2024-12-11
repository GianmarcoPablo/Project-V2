import "dotenv/config"
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from "cloudinary"
import { IStorageService } from "../../../domain/providers-interfaces/storage/storage.service.interface";

export const config = {
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
}


export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export class StorageService implements IStorageService {
    constructor() {
        cloudinary.config({
            cloud_name: config.cloudinary.cloud_name,
            api_key: config.cloudinary.api_key,
            api_secret: config.cloudinary.api_secret
        });
    }

    async uploadFile(file: string, folder: string): Promise<CloudinaryResponse> {
        try {
            const uploadStream = await cloudinary.uploader.upload(file, { folder: folder })
            return uploadStream
        } catch (error) {
            console.log({ error })
            throw error
        }
    }
}