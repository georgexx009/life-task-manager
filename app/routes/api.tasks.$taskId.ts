import { ActionFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { z } from "zod";
import { deleteTask, updateTask } from "~/repo";

export const action: ActionFunction = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  if (!params.taskId) {
    return json({ status: 400, message: "missing param task id" });
  }

  if (request.method === "DELETE") {
    const success = await deleteTask(parseInt(params.taskId));
    if (success) {
      return json({ message: "Task deleted successfully" });
    }
    return json({ status: 400, message: "Task NOT deleted successfully" });
  }

  if (request.method === "PUT") {
    const body = Object.fromEntries(await request.formData());
    const taskSchema = z.object({
      // id: z.number(),
      name: z.string(),
      // listId: z.string(),
      // rangeTimeToDo: z.string(),
      // repeatMonthly: z.string(),
    });

    try {
      const task = taskSchema.parse(body);
      const success = await updateTask(parseInt(params.taskId), task);
      if (success) {
        return json({ message: "Task updated" });
      }
      return json({ status: 500, message: "Task NOT updated" });
    } catch (e) {
      console.log("schema error: ", e);
      json({ status: 400, message: `schema error: ${e}` });
    }
  }

  return json({ status: 404, message: "not found" });
};
