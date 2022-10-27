import { config } from "./utils/config";
import { createServer } from "./utils/createServer";
import { connectToDB, disconnectFromDB } from "./utils/db";
import { logger } from "./utils/logger";

const signals = ["SIGINT", "SIGHUP", "SIGTERM"] as const;

async function shutDown({
  signal,
  server,
}: {
  signal: typeof signals[number];
  server: Awaited<ReturnType<typeof createServer>>;
}) {
  logger.info(`Got signal ${signal}. Good bye`);
  await server.close();

  await disconnectFromDB();

  process.exit(0);
}

async function startServer() {
  const server = await createServer();

  server.listen({
    port: config.PORT,
    host: config.HOST,
  });

  await connectToDB();

  logger.info(`app is listening`);

  signals.forEach((i) => {
    process.on(i, () =>
      shutDown({
        signal: i,
        server,
      })
    );
  });
}

startServer();
