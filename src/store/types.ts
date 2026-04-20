// Node types
export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface BaseNodeData {
  label: string;
  nodeType: NodeType;
  metadata?: Record<string, string>;
  [key: string]: unknown;
}

export interface StartNodeData extends BaseNodeData {
  nodeType: 'start';
  title: string;
}

export interface TaskNodeData extends BaseNodeData {
  nodeType: 'task';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  nodeType: 'approval';
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedStepNodeData extends BaseNodeData {
  nodeType: 'automated';
  title: string;
  actionId: string;
  actionParams: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  nodeType: 'end';
  endMessage: string;
  showSummary: boolean;
}

export type NodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

// Automation from mock API
export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

// Simulation request/response
export interface SimulationRequest {
  nodes: Array<{ id: string; type: NodeType; data: NodeData }>;
  edges: Array<{ source: string; target: string }>;
}

export interface SimulationStep {
  step: number;
  nodeId: string;
  nodeType: NodeType;
  action: string;
  status: 'pending' | 'completed' | 'skipped';
  message: string;
}

export interface SimulationResponse {
  success: boolean;
  steps: SimulationStep[];
  errors: string[];
}

// Validation error
export interface ValidationError {
  type: 'missing_start' | 'missing_end' | 'cycle' | 'disconnected' | 'invalid_edge';
  message: string;
  nodeId?: string;
}
