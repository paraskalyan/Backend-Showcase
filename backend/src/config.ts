export const config = {
  port: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://user:password@localhost:5432/mydb",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "default_cookie_secret",
};
