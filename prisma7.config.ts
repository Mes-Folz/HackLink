import { config } from "dotenv";
import { defineConfig } from "prisma/config";

if (!process.env.VERCEL) {
  config({ path: ".env.local" });
  config();
}

const isGenerateCommand = process.argv.includes("generate")
  || ["prebuild", "predev", "db:seed"].includes(process.env.npm_lifecycle_event ?? "");
const datasourceUrl = process.env.DATABASE_URL_UNPOOLED
  || (isGenerateCommand ? process.env.DATABASE_URL : undefined);

if (!datasourceUrl) {
  throw new Error(isGenerateCommand
    ? "DATABASE_URL or DATABASE_URL_UNPOOLED is required for Prisma client generation."
    : "DATABASE_URL_UNPOOLED is required for Prisma migrations.");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: datasourceUrl },
});
