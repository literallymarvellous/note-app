import { createTodoSchema } from "./todo.schema";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { createTodoHandler } from "./todo.contoller";

export function todoRoute(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  app.post(
    "/",
    {
      schema: createTodoSchema,
    },
    createTodoHandler
  );
  done();
}
