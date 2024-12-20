enum ApplicationStatus {
    PENDING, // Postulación recibida pero no revisada
    REVIEWED, // Postulación revisada
    SHORTLISTED, // Seleccionado para la siguiente etapa
    REJECTED, // Postulación rechazada
    ACCEPTED, // Aprobado para el puesto
}


export interface CreateUserApplicationJob {
    userId: string,
    jobId: string,
    status: ApplicationStatus,
    createdAt: Date,
    updatedAt: Date,
    coverLetter?: string,
    resumeLink?: string,
}