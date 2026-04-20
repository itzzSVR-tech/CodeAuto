import { create } from 'zustand';
import type { Node, Edge } from '@xyflow/react';
import type { NodeData, NodeType, AutomationAction, SimulationResponse, ValidationError } from './types';

interface WorkflowState {
  // Canvas state
  nodes: Node<NodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;

  // API state
  automations: AutomationAction[];

  // Simulation state
  simulationResult: SimulationResponse | null;
  isSimulating: boolean;

  // Validation state
  validationErrors: ValidationError[];

  // Actions
  addNode: (node: Node<NodeData>) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
  deleteNode: (nodeId: string) => void;
  addEdge: (edge: Edge) => void;
  deleteEdge: (edgeId: string) => void;
  setSelectedNode: (nodeId: string | null) => void;
  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;

  // API actions
  fetchAutomations: () => Promise<void>;
  simulateWorkflow: () => Promise<void>;

  // Validation
  validateWorkflow: () => ValidationError[];
  clearSimulation: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  // Initial state
  nodes: [],
  edges: [],
  selectedNodeId: null,
  automations: [],
  simulationResult: null,
  isSimulating: false,
  validationErrors: [],

  // Node actions
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node],
    selectedNodeId: node.id
  })),

  updateNode: (nodeId, data) => set((state) => {
    const nodes = state.nodes.map((n) =>
      n.id === nodeId ? { ...n, data: { ...n.data, ...data } as NodeData } : n
    );
    return { nodes };
  }),

  deleteNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter((n) => n.id !== nodeId),
    edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
    selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId
  })),

  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge]
  })),

  deleteEdge: (edgeId) => set((state) => ({
    edges: state.edges.filter((e) => e.id !== edgeId)
  })),

  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  // API actions
  fetchAutomations: async () => {
    try {
      const response = await fetch('/api/automations');
      const data = await response.json();
      set({ automations: data });
    } catch (error) {
      console.error('Failed to fetch automations:', error);
    }
  },

  simulateWorkflow: async () => {
    const { nodes, edges, validateWorkflow } = get();

    // Trigger validation update
    const errors = validateWorkflow();
    if (errors.length > 0) {
      set({
        simulationResult: {
          success: false,
          steps: [],
          errors: errors.map(e => e.message)
        },
        isSimulating: false
      });
      return;
    }

    set({ isSimulating: true });

    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: nodes.map(n => ({ id: n.id, type: n.type as NodeType, data: n.data })),
          edges: edges.map(e => ({ source: e.source, target: e.target }))
        })
      });
      const result = await response.json();
      set({ simulationResult: result, isSimulating: false });
    } catch (error) {
      set({
        simulationResult: {
          success: false,
          steps: [],
          errors: ['Simulation failed: ' + String(error)]
        },
        isSimulating: false
      });
    }
  },

  // Validation logic - can be called to both get errors and update store state
  validateWorkflow: () => {
    const state = get();
    const { nodes, edges } = state;
    const errors: ValidationError[] = [];

    // Check for start node
    const startNodes = nodes.filter(n => n.data?.nodeType === 'start');
    if (startNodes.length === 0) {
      errors.push({ type: 'missing_start', message: 'Workflow must have a Start node' });
    } else if (startNodes.length > 1) {
      errors.push({ type: 'invalid_edge', message: 'Workflow can only have one Start node' });
    }

    // Check for end node
    const endNodes = nodes.filter(n => n.data?.nodeType === 'end');
    if (endNodes.length === 0) {
      errors.push({ type: 'missing_end', message: 'Workflow must have an End node' });
    }

    // Check for disconnected nodes (except start)
    const connectedIds = new Set<string>();
    edges.forEach(e => {
      connectedIds.add(e.source);
      connectedIds.add(e.target);
    });

    nodes.forEach(n => {
      const isStart = n.data?.nodeType === 'start';
      if (!isStart && !connectedIds.has(n.id)) {
        errors.push({
          type: 'disconnected',
          message: `Node "${n.data?.label || n.id}" is not connected`,
          nodeId: n.id
        });
      }
    });

    // Detect cycles using DFS
    const adjacencyList = new Map<string, string[]>();
    nodes.forEach(n => adjacencyList.set(n.id, []));
    edges.forEach(e => {
      const list = adjacencyList.get(e.source) || [];
      list.push(e.target);
      adjacencyList.set(e.source, list);
    });

    const visited = new Set<string>();
    const recStack = new Set<string>();

    const detectCycle = (nodeId: string): boolean => {
      if (recStack.has(nodeId)) return true;
      if (visited.has(nodeId)) return false;

      visited.add(nodeId);
      recStack.add(nodeId);

      const neighbors = adjacencyList.get(nodeId) || [];
      for (const neighbor of neighbors) {
        if (detectCycle(neighbor)) return true;
      }

      recStack.delete(nodeId);
      return false;
    };

    for (const node of nodes) {
      if (!visited.has(node.id)) {
        if (detectCycle(node.id)) {
          errors.push({ type: 'cycle', message: 'Workflow contains a cycle' });
          break;
        }
      }
    }

    // Only update if errors changed to avoid unnecessary re-renders
    if (JSON.stringify(state.validationErrors) !== JSON.stringify(errors)) {
      set({ validationErrors: errors });
    }
    
    return errors;
  },

  clearSimulation: () => set({ simulationResult: null, validationErrors: [] })
}));

