import { CreateCategoryDto } from "../../dtos/category/create-category.dto";
import { Category } from "../../entities/category/Category";
import { CategoryRepository } from "../../repositories/category/category.repository";

interface ICreateCategoryUseCase {
    execute(body: CreateCategoryDto): Promise<Category>
}

export class CreateCategoryUseCase implements ICreateCategoryUseCase {

    constructor(
        private readonly repository: CategoryRepository
    ) { }

    async execute(body: CreateCategoryDto): Promise<Category> {
        const category = await this.repository.create(body)
        return category
    }
}