import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { AuthRoutes } from './presentation/routes/auth/auth.routes';
import { AuthReposioryImpl } from './infrastructure/repositories/auth/auth.repository.impl';
import { HashPasswordService } from './infrastructure/providers/auth/hash-password.service';
import { TokenService } from './infrastructure/providers/auth/token.service';
import { CompanyRoutes } from './presentation/routes/company/company.routes';
import { CompanyRepositoryImpl } from './infrastructure/repositories/company/company.repository.impl';
import { StorageService } from './infrastructure/providers/storage/storage.service';
import { AdvertisementJobRoutes } from './presentation/routes/advertisement-job/advertisement-job.routes';
import { AdvertisementJobRepositoryImpl } from './infrastructure/repositories/advertisement-job/advertisement-job.repository.impl';
import { CategoryRepositoryImpl } from './infrastructure/repositories/category/category.repository.impl';
import { CategoryRoutes } from './presentation/routes/category/category.routes';
import { SeedRoutes } from './presentation/routes/seed/seed.routes';

const app = new Hono()


// Cors
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

// Use the logger middleware to log requests
app.use(logger());

// Static files
app.use("/static/*", serveStatic({ root: "./" }))

// Home Route
app.get("/", (c) => c.text("Hono! with Bun"));

// Routes
app.route("/api/v1/auth", new AuthRoutes(
  new AuthReposioryImpl(),
  new HashPasswordService(),
  new TokenService()).routes
)
app.route("/api/v1/company", new CompanyRoutes(
  new CompanyRepositoryImpl(),
  new StorageService()).routes
)
app.route("/api/v1/advertisement", new AdvertisementJobRoutes(
  new AdvertisementJobRepositoryImpl(),
  new CategoryRepositoryImpl(),
  new AuthReposioryImpl(),
  new CompanyRepositoryImpl()).routes
)
app.route("/api/v1/category", new CategoryRoutes(
  new CategoryRepositoryImpl()).routes
)

app.route("/api/v1/seed", new SeedRoutes().routes)

// Routes - Not found
app.notFound((c) => {
  return c.text('Custom 404 Message', 404)
})

// Routes - Error Handler
app.onError((err, c) => {
  console.error(`${err}`)
  return c.text('Custom Error Message', 500)
})

const startServer = async () => {
  try {
    const server = Bun.serve({
      port: 5000,
      fetch: app.fetch,
    });

    console.log(`Server running at ${server.url.host}`);
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

startServer();


export default app