import { SaveAdvertisementJobDto } from "../../dtos/advertisement-job/save-advertisement-job.dto";
import { AdvertisementJobRepository } from "../../repositories/advertisement-job/advertisement-job.repository";

interface ISaveAdvertisementJobUseCase {
    execute(body: SaveAdvertisementJobDto): Promise<any>
}

export class SaveAdvertisementJobUseCase implements ISaveAdvertisementJobUseCase {

    constructor(
        private readonly repository: AdvertisementJobRepository,
    ) { }

    async execute(body: SaveAdvertisementJobDto): Promise<any> {
        console.log(body)
        const data = await this.repository.save(body)
        console.log(data)
        return data
    }

}