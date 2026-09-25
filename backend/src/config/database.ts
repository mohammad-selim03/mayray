import prisma from "./prisma";

const connectDB = async (): Promise<void> => {
  await prisma.$connect();
  console.log("Prisma connected to Supabase PostgreSQL");
};

export default connectDB;
