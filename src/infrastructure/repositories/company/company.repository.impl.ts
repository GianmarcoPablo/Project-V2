import { CreateCompanyDto, CreateCompanyPrismaDto } from "../../../domain/dtos/company/create-company.dto";
import { Company } from "../../../domain/entities/company/Company";
import { CompanyRepository } from "../../../domain/repositories/company/company.repository";
import { prisma } from "../../orm/prisma";

export class CompanyRepositoryImpl implements CompanyRepository {

    async createCompany(body: CreateCompanyPrismaDto): Promise<Company> {
        try {
            const company = await prisma.company.create({ data: body })
            return new Company(
                company.id,
                company.name,
                company.description,
                company.logoUrl,
                company.isVerified,
                company.socialLinks,
                company.createdAt,
                company.updatedAt,
                company.userId,
                company.phone ? company.phone : undefined,
                company.address ? company.address : undefined,
                company.industry ? company.industry : undefined,
                company.website ? company.website : undefined
            )
        } catch (error) {
            console.error("Error created company:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }
}