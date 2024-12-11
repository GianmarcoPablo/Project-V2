// create-company.dto.ts
export interface CreateCompanyDto {
    name: string,
    description: string,
    isVerified: boolean,
    socialLinks: string[],
    industry: string,
    logoUrl: File, // Mantén File para manejar la carga
    userId: string,
    phone?: string,
    address?: string,
    website?: string
}

// create-company-prisma.dto.ts
export interface CreateCompanyPrismaDto {
    name: string,
    description: string,
    isVerified: boolean,
    socialLinks: string[],
    industry: string,
    logoUrl: string, // URL como string para Prisma
    userId: string,
    phone?: string,
    address?: string,
    website?: string
}