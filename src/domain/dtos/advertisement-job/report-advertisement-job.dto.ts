
enum ReportStatus {
    PENDING, // Reporte en espera de revisión
    REVIEWED, // Reporte revisado
    RESOLVED,// Se tomaron medidas para resolver el reporte
    DISMISSED, // Reporte desestimado
}

export interface ReportAdvertisementJobDto {
    userId: string,
    jobId: string,
    reason: string,
    description?: string,
    status: ReportStatus
}
