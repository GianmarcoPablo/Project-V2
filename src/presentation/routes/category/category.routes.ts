import { Hono } from "hono";
import { BlankEnv, BlankSchema } from "hono/types";
import { CategoryRepository } from "../../../domain/repositories/category/category.repository";
import { zCreateCategorySchema } from "../../validators/category/create-category.validator";
import { CreateCategoryUseCase } from "../../../domain/use-cases/category/create-category.use-case";
import { GetAllCategoriesUseCase } from "../../../domain/use-cases/category/get-all-categories.use-case";


export class CategoryRoutes {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) { }

    public get routes(): Hono<BlankEnv, BlankSchema, "/"> {
        const router = new Hono();

        router.post("/", zCreateCategorySchema, async (c) => {
            const body = c.req.valid("json");
            const data = await new CreateCategoryUseCase(this.categoryRepository).execute(body)
            return c.json(data)
        });

        router.get("/", async (c) => {
            const data = await new GetAllCategoriesUseCase(this.categoryRepository).execute({ limit: 1, page: 1 })
            return c.json(data)
        })

        return router;
    }
}





