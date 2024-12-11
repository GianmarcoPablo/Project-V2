import { CreateCategoryDto } from "../../dtos/category/create-category.dto";
import { Category } from "../../entities/category/Category";

export abstract class CategoryRepository {
    abstract createCategory(bdoy: CreateCategoryDto): Promise<Category>
    abstract findCategoryById(categoryId: string): Promise<Category | null>
}