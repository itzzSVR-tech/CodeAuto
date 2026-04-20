import { useCallback, useRef, useEffect, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Panel,
} from '@xyflow/react';
import type {
  Connection,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { v4 as uuidv4 } from 'uuid';
import { useWorkflowStore } from '../../store/workflowStore';
import type { NodeType, NodeData, ValidationError } from '../../store/types';
import { nodeTypes } from '../Nodes';
import Sidebar from './Sidebar';
import NodeFormPanel from '../Forms/NodeFormPanel';
import CanvasControls from './Controls';

function WorkflowCanvasInner() {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes,
    setEdges,
    addNode,
    addEdge: addEdgeToStore,
    deleteNode,
    setSelectedNode,
    selectedNodeId,
    validateWorkflow,
    simulateWorkflow,
    clearSimulation,
    validationErrors,
  } = useWorkflowStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Synchronize local state with store
  const [nodes, setNodesState] = useNodesState(storeNodes);
  const [edges, setEdgesState] = useEdgesState(storeEdges);

  useEffect(() => {
    setNodesState(storeNodes);
  }, [storeNodes, setNodesState]);

  useEffect(() => {
    setEdgesState(storeEdges);
  }, [storeEdges, setEdgesState]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      const updatedNodes = applyNodeChanges(changes, nodes) as Node<NodeData>[];
      setNodesState(updatedNodes);
      setNodes(updatedNodes);
    },
    [nodes, setNodesState, setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      const updatedEdges = applyEdgeChanges(changes, edges);
      setEdgesState(updatedEdges);
      setEdges(updatedEdges);
    },
    [edges, setEdgesState, setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `edge-${uuidv4()}`,
        type: 'default',
        animated: true,
      };
      const updatedEdges = addEdge(newEdge, edges);
      setEdgesState(updatedEdges);
      setEdges(updatedEdges);
    },
    [edges, setEdgesState, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type) return;

      if (!reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left - 100,
        y: event.clientY - bounds.top - 50,
      };

      const newNode: Node<NodeData> = {
        id: `node-${uuidv4()}`,
        type,
        position,
        data: {
          label: type.charAt(0).toUpperCase() + type.slice(1),
          nodeType: type,
          ...(type === 'start' && { title: 'Start Workflow' }),
          ...(type === 'task' && {
            title: 'New Task',
            description: 'Define the task parameters',
          }),
          ...(type === 'approval' && {
            title: 'Approval Request',
            approverRole: 'Manager',
          }),
          ...(type === 'automated' && {
            title: 'Automated Step',
            actionId: 'SYNC_DATA',
          }),
          ...(type === 'end' && {
            endMessage: 'Workflow Completed',
          }),
        } as any,
      };

      addNode(newNode);
    },
    [addNode]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      validateWorkflow();
    }
  }, [nodes, edges, validateWorkflow]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNodeId) {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement
        ) {
          return;
        }
        deleteNode(selectedNodeId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, deleteNode]);

  const isValid = validationErrors.length === 0 && storeNodes.length > 0;

  return (
    <div className="flex h-full w-full bg-slate-50 overflow-hidden font-sans">
      <Sidebar
        onDragStart={(event, nodeType) => {
          event.dataTransfer.setData('application/reactflow', nodeType);
          event.dataTransfer.effectAllowed = 'move';
        }}
      />
      
      <div className="flex-1 relative" ref={reactFlowWrapper}>
        {/* Canvas Breadcrumbs / Header Overlay */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none text-center">
           <div className="flex items-center gap-3 mb-3">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">User Automation</span>
             <div className="w-1 h-1 rounded-full bg-slate-300" />
             <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">Flow Designer</span>
           </div>
           <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight flex items-center gap-3 pointer-events-auto cursor-default">
             Automated Onboarding
             <svg className="w-5 h-5 text-slate-300 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
           </h2>
           <p className="text-[11px] font-black text-slate-400 mt-1 uppercase tracking-wider">Configuration Hub & Logic Orchestration</p>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={[]}
          className="bg-slate-50"
        >
          <Background color="#cbd5e1" gap={24} size={1} />
          
          <Panel position="top-right" className="pointer-events-none mt-4 mr-4">
            {validationErrors.length > 0 && storeNodes.length > 0 && (
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-red-100 max-w-sm pointer-events-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.6)] animate-pulse" />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Critical Issues ({validationErrors.length})</h3>
                </div>
                <div className="space-y-3">
                  {validationErrors.map((error, idx) => (
                    <div key={idx} className="group flex gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100/50 transition-colors hover:bg-red-50">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs">!</div>
                      <p className="text-xs text-red-700 leading-tight font-semibold py-0.5">{error.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Panel>

          <CanvasControls
            onReset={() => {
              if (confirm('Clear the entire workflow canvas? This cannot be undone.')) {
                setNodes([]);
                setEdges([]);
                setSelectedNode(null);
                clearSimulation();
              }
            }}
            onTest={simulateWorkflow}
            isValid={isValid}
          />
        </ReactFlow>
      </div>

      <div className="w-80 bg-white border-l border-slate-200">
        <NodeFormPanel />
      </div>
    </div>
  );
}

export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner />
    </ReactFlowProvider>
  );
}

