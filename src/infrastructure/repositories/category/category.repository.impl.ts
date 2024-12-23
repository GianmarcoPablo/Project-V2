import { CreateCategoryDto } from "../../../domain/dtos/category/create-category.dto";
import { UpdateCategoryDto } from "../../../domain/dtos/category/update-category.dto";
import { Category } from "../../../domain/entities/category/Category";
import { CategoryRepository } from "../../../domain/repositories/category/category.repository";
import { prisma } from "../../orm/prisma";

export class CategoryRepositoryImpl implements CategoryRepository {

    async create(body: CreateCategoryDto): Promise<Category> {
        try {
            const category = await prisma.category.create({ data: body })
            return new Category(category.id, category.name)
        } catch (error) {
            console.error("Error created category:", error);
            throw error; // Lanzar el error para que no se devuelva undefined
        }
    }

    async getAll({ page, limit }: { page: number; limit: number; }): Promise<Category[]> {
        try {
            const categories = await prisma.category.findMany()
            return categories.map(category =>
                new Category(
                    category.id,
                    category.name
                )
            )
        } catch (error) {
            console.error("Error get all categories:", error);
            throw error;
        }
    }

    async delete(id: string): Promise<string> {
        try {
            const category = await prisma.category.delete({ where: { id } })
            return `Category with id ${category.id} is deleted`
        } catch (error) {
            console.error("Error delete cateogry:", error);
            throw error;
        }
    }

    async getById(categoryId: string): Promise<Category | null> {
        try {
            const category = await prisma.category.findUnique({ where: { id: categoryId } })
            if (!category) return null; // Retorna null si no existe la categoría
            return new Category(category.id, category.name);
        } catch (error) {
            console.error("error get category by id:", error);
            throw error;
        }
    }

    async update(id: string, body: UpdateCategoryDto): Promise<Category> {
        try {
            const categoryUpdated = await prisma.category.update({ where: { id }, data: body })
            return categoryUpdated
        } catch (error) {
            console.error("error updated category by id:", error);
            throw error;
        }
    }
}