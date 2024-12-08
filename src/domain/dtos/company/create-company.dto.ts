

export interface CreateCompanyDto {
    name: string,
    description: string,
    logoUrl: string,
    isVerified: boolean,
    socialLinks: string[],
    industry: string,
    userId: string,
    phone?: string,
    address?: string,
    website?: string
}