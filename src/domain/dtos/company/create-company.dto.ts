


export interface CreateCompanyDto {
    name: string,
    description: string,
    isVerified: boolean,
    socialLinks: string[],
    industry: string,
    userId: string,
    logoUrl?: any, // URL como string para Prisma
    bannerUrl?: any,
    phone?: string,
    address?: string,
    website?: string
}