import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import exp from "constants";
import { Hono } from "hono";
import { createTaskSchema } from "../schemas";
import { getMember } from "@/features/members/utils";
import { DATABASE_ID, TASKS_ID } from "@/config";
import { ID, Query } from "node-appwrite";

const app = new Hono().post(
  "/",
  sessionMiddleware,
  zValidator("json", createTaskSchema),
  async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const { name, status, workspaceId, projectId, dueDate, assigneeId } =
      c.req.valid("json");

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const highestPositionTask = await databases.listDocuments(
      DATABASE_ID,
      TASKS_ID,
      [
        Query.equal("status", status),
        Query.equal("workspaceId", workspaceId),
        Query.orderAsc("position"),
        Query.limit(1),
      ]
    );

    const newPosition =
      highestPositionTask.documents.length > 0
        ? highestPositionTask.documents[0].position + 1000
        : 1000;

    const task = await databases.createDocument(
      DATABASE_ID,
      TASKS_ID,
      ID.unique(),
      {
        name,
        status,
        workspaceId,
        projectId,
        dueDate,
        assigneeId,
        position: newPosition,
      }
    );

    return c.json({ data: task });
  }
);

export default app;
