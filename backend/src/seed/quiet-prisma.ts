import { PrismaClient } from "@prisma/client";

// The app logs every query in development; the seed only needs errors. Imported before anything that
// loads config/prisma, which reuses this client.
globalThis.__prisma ??= new PrismaClient({ log: ["error"] });
