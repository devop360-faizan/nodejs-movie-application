import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query"] : [],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Database disconnected successfully");
  } catch (error) {
    console.error("Database disconnection failed", error);
    process.exit(1);
  }
};

export default { prisma, connectDB, disconnectDB };
