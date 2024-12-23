import { Category } from "../../entities/category/Category";
import { CategoryRepository } from "../../repositories/category/category.repository";

interface IGetAllCategoriesUseCase {
    execute({ limit, page }: { limit: number, page: number }): Promise<Category[]>
}


export class GetAllCategoriesUseCase implements IGetAllCategoriesUseCase {

    constructor(
        private readonly repository: CategoryRepository
    ) { }

    async execute({ limit, page }: { limit: number, page: number }): Promise<Category[]> {
        return this.repository.getAll({ limit, page })
    }
}