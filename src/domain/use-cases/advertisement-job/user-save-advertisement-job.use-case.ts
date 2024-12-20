import { SaveAdvertisementJobDto } from "../../dtos/advertisement-job/save-advertisement-job.dto";

interface ISaveAdvertisementJobUseCase {
    execute(body: SaveAdvertisementJobDto): Promise<string>
}

export class SaveAdvertisementJobUseCase implements ISaveAdvertisementJobUseCase {
    execute(body: SaveAdvertisementJobDto): Promise<string> {
        throw new Error("Method not implemented.");
    }
}