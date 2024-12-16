import { CreateCompanyDto } from "../../../domain/dtos/company/create-company.dto";
import { UpdateCompanyDto } from "../../../domain/dtos/company/update-company.do";
import { Company } from "../../../domain/entities/company/Company";
import { CompanyRepository } from "../../../domain/repositories/company/company.repository";
import { prisma } from "../../orm/prisma";

export class CompanyRepositoryImpl implements CompanyRepository {

    async getAll(body: any): Promise<Company[]> {
        try {
            const companies = await prisma.company.findMany()
            return companies.map(company =>
                new Company(
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
            );
        } catch (error) {
            console.error("Error get all companies:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }

    async getById(id: string): Promise<Company | null> {
        try {
            const company = await prisma.company.findUnique({ where: { id } })
            if (!company) return null
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
            console.error("Error find company:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }

    async create(body: CreateCompanyDto): Promise<Company> {
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



    async update(id: string, body: UpdateCompanyDto): Promise<Company> {
        try {
            const company = await prisma.company.update({ where: { id }, data: body })
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
            console.error("Error find company:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }
}