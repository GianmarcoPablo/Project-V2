


export interface CreateCompanyDto {
    name: string,
    description: string,
    logoUrl: any, // URL como string para Prisma
    isVerified: boolean,
    socialLinks: string[],
    industry: string,
    userId: string,
    phone?: string,
    address?: string,
    website?: string
}