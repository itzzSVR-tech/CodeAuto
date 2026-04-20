import { http, HttpResponse } from 'msw';

export const automations = [
  {
    id: 'send_email',
    label: 'Send Email',
    params: ['to', 'subject', 'body']
  },
  {
    id: 'generate_doc',
    label: 'Generate Document',
    params: ['template', 'recipient', 'format']
  },
  {
    id: 'create_task',
    label: 'Create Task',
    params: ['title', 'assignee', 'priority']
  },
  {
    id: 'send_notification',
    label: 'Send Notification',
    params: ['channel', 'message', 'recipient']
  },
  {
    id: 'update_record',
    label: 'Update Record',
    params: ['entity', 'id', 'fields']
  }
];

export const handlers = [
  // GET /api/automations
  http.get('/api/automations', () => {
    return HttpResponse.json(automations);
  }),

  // POST /api/simulate
  http.post('/api/simulate', async ({ request }) => {
    const body = await request.json() as {
      nodes: Array<{ id: string; type: string; data: { label: string; nodeType: string } }>;
      edges: Array<{ source: string; target: string }>;
    };

    const { nodes, edges } = body;

    // Build execution order using topological sort
    const inDegree = new Map<string, number>();
    const adjacencyList = new Map<string, string[]>();

    nodes.forEach(n => {
      inDegree.set(n.id, 0);
      adjacencyList.set(n.id, []);
    });

    edges.forEach(e => {
      const list = adjacencyList.get(e.source) || [];
      list.push(e.target);
      adjacencyList.set(e.source, list);
      inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1);
    });

    // Find start node
    const startNode = nodes.find(n => n.data?.nodeType === 'start');
    const executionOrder: string[] = [];
    const queue: string[] = [];

    if (startNode) {
      queue.push(startNode.id);
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      executionOrder.push(current);

      const neighbors = adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
        if ((inDegree.get(neighbor) || 0) === 0) {
          queue.push(neighbor);
        }
      }
    }

    // Generate simulation steps
    const steps = executionOrder.map((nodeId, index) => {
      const node = nodes.find(n => n.id === nodeId);
      const nodeType = node?.data?.nodeType as string;
      const label = node?.data?.label || nodeId;

      let action: string;
      let message: string;

      switch (nodeType) {
        case 'start':
          action = 'Initialize Workflow';
          message = `Workflow started: ${label}`;
          break;
        case 'task':
          action = 'Human Task';
          message = `Task "${(node?.data as any)?.title || label}" assigned to ${(node?.data as any)?.assignee || 'unassigned'}`;
          break;
        case 'approval':
          action = 'Approval Required';
          message = `Awaiting approval from ${(node?.data as any)?.approverRole || 'approver'}`;
          break;
        case 'automated':
          action = 'Automated Action';
          message = `Executing: ${(node?.data as any)?.actionId || 'unknown action'}`;
          break;
        case 'end':
          action = 'Complete Workflow';
          message = `Workflow completed: ${(node?.data as any)?.endMessage || 'finished'}`;
          break;
        default:
          action = 'Unknown';
          message = `Unknown node type`;
      }

      return {
        step: index + 1,
        nodeId,
        nodeType,
        action,
        status: 'completed' as const,
        message
      };
    });

    const errors: string[] = [];

    if (nodes.length === 0) {
      errors.push('No nodes in workflow');
    }

    if (!startNode) {
      errors.push('Workflow must have a start node');
    }

    return HttpResponse.json({
      success: errors.length === 0,
      steps,
      errors
    });
  })
];
