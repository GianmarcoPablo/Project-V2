import { CreateCategoryDto } from "../../dtos/category/create-category.dto";
import { Category } from "../../entities/category/Category";

export abstract class CategoryRepository {
    abstract create(bdoy: CreateCategoryDto): Promise<Category>
    abstract findById(categoryId: string): Promise<Category | null>
}