import mongoose from "mongoose";
import { config } from "./config";
import { logger } from "./logger";

export async function connectToDB() {
  try {
    await mongoose.connect(config.DATABASE_URL);
    logger.info("Connected to database");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

export function disconnectFromDB() {
  return mongoose.connection.close();
}
