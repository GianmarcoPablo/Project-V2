import { CloudinaryResponse } from "../../../infrastructure/providers/storage/storage.service";

export interface IStorageService {
    uploadFile(file: string, filename: string): Promise<CloudinaryResponse>;
    //deleteFile(fileUrl: string): any;
    //getSignedUrl(fileUrl: string): any;
}