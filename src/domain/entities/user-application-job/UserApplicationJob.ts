enum ApplicationStatus {
    PENDING, // Postulación recibida pero no revisada
    REVIEWED, // Postulación revisada
    SHORTLISTED, // Seleccionado para la siguiente etapa
    REJECTED, // Postulación rechazada
    ACCEPTED, // Aprobado para el puesto
}

export class UserApplicationJob {
    constructor(
        public id: string,
        public userId: string,
        public jobId: string,
        public status: ApplicationStatus,
        public createdAt: Date,
        public updatedAt: Date,
        public coverLetter?: string,
        public resumeLink?: string,
    ) { }
}