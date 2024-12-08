import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { AuthRoutes } from './presentation/routes/auth/auth.routes';
import { AuthReposioryImpl } from './infrastructure/repositories/auth/auth.repository.impl';
import { HashPasswordService } from './infrastructure/providers/auth/hash-password.service';
import { TokenService } from './infrastructure/providers/auth/token.service';
import { CompanyRoutes } from './presentation/routes/company/company.routes';
import { CompanyRepositoryImpl } from './infrastructure/repositories/company/company.repository.impl';

const app = new Hono()

// Use the logger middleware to log requests
app.use(logger());

// Cors
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
)

// Home Route
app.get("/", (c) => c.text("Hono! with Bun"));

// Routes
app.route("/api/v1/auth", new AuthRoutes(new AuthReposioryImpl(), new HashPasswordService(), new TokenService()).routes)
app.route("/api/v1/company", new CompanyRoutes(new CompanyRepositoryImpl()).routes)

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