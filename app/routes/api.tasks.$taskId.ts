import { ActionFunction, ActionFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { deleteTask } from '~/repo';

export const action: ActionFunction = async ({ request, params }: ActionFunctionArgs) => {
  if (request.method === 'DELETE') {
    if (params.taskId) {
      const success = await deleteTask(parseInt(params.taskId))
      if (success) {
        return json({ message: 'Task deleted successfully' });
      }
      return json({ status: 400, message: 'Task NOT deleted successfully' });
    }
    
    return json({ status: 400, message: 'missing id' });
  }

  return json({ status: 404, message: 'not found' });
};
