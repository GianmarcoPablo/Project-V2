export interface UpdateCompanyDto {
    name?: string,
    description?: string,
    isVerified?: boolean,
    socialLinks?: string[],
    industry?: string,
    logoUrl?: any, // URL como string para Prisma
    userId?: string,
    phone?: string,
    address?: string,
    website?: string
}