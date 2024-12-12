import { CreateCategoryDto } from "../../../domain/dtos/category/create-category.dto";
import { Category } from "../../../domain/entities/category/Category";
import { CategoryRepository } from "../../../domain/repositories/category/category.repository";
import { prisma } from "../../orm/prisma";

export class CategoryRepositoryImpl implements CategoryRepository {

    async create(body: CreateCategoryDto): Promise<Category> {
        try {
            const category = await prisma.category.create({ data: body })
            return new Category(category.id, category.name)
        } catch (error) {
            console.error("Error registering user:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }

    async findById(categoryId: string): Promise<Category | null> {
        try {
            const category = await prisma.category.findUnique({ where: { id: categoryId } })
            if (!category) return null; // Retorna null si no existe la categoría
            return new Category(category.id, category.name);
        } catch (error) {
            console.error("Error registering user:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }
}