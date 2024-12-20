import { ReportAdvertisementJobDto } from "../../dtos/advertisement-job/report-advertisement-job.dto";

interface IReportAdvertisementJobUsecase {
    execute(body: ReportAdvertisementJobDto): Promise<string>
}

export class ReportAdvertisementJobUsecase implements IReportAdvertisementJobUsecase {
    execute(body: ReportAdvertisementJobDto): Promise<string> {
        throw new Error("Method not implemented.");
    }
}