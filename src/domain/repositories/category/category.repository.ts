import { CreateCategoryDto } from "../../dtos/category/create-category.dto";
import { UpdateCategoryDto } from "../../dtos/category/update-category.dto";
import { Category } from "../../entities/category/Category";

export abstract class CategoryRepository {
    abstract create(bdoy: CreateCategoryDto): Promise<Category>
    abstract update(id: string, body: UpdateCategoryDto): Promise<Category>
    abstract getAll({ page, limit }: { page: number, limit: number }): Promise<Category[]>
    abstract getById(categoryId: string): Promise<Category | null>
    abstract delete(id: string): Promise<string>
}