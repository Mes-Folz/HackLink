import { config } from "dotenv";
import { defineConfig } from "prisma/config";

if (!process.env.VERCEL) {
  config({ path: ".env.local" });
  config();
}

const isGenerateCommand = process.argv[2] === "generate";
const datasourceUrl = process.env.DATABASE_URL_UNPOOLED
  || (isGenerateCommand ? process.env.DATABASE_URL : undefined);

if (!datasourceUrl) {
  throw new Error("DATABASE_URL_UNPOOLED is required for Prisma migrations. Client generation may use DATABASE_URL.");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: datasourceUrl },
});
