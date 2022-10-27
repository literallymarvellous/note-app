import swagger from "@fastify/swagger";
import fastify from "fastify";
import { todoRoute } from "../modules/todo/todo.route";
import { version } from "../../package.json";

export async function createServer() {
  const app = fastify();

  app.register(swagger, {
    swagger: {
      tags: [
        {
          name: "todo",
        },
      ],
      info: {
        title: "Todo",
        description: "A simple todo app",
        version,
      },
      host: "localhost",
    },
  });

  app.register(todoRoute, { prefix: "/api/todos" });

  return app;
}
