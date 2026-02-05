import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const {Pool} = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error']
})

const connectDB = async () => {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection failed:', error)
    process.exit(1)
  }
}

const disconnectDB = async () => {
  try {
    await prisma.$disconnect()
    await pool.end()
    console.log('Database disconnected')
  } catch (error) {
    console.error('Database disconnect error:', error)
  }
}

export { prisma, connectDB, disconnectDB }
