import { useCallback } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import type { NodeData } from '../../store/types';
import StartNodeForm from './StartNodeForm';
import TaskNodeForm from './TaskNodeForm';
import ApprovalNodeForm from './ApprovalNodeForm';
import AutomatedStepForm from './AutomatedStepForm';
import EndNodeForm from './EndNodeForm';

export default function NodeFormPanel() {
  const { selectedNodeId, nodes, updateNode, deleteNode } = useWorkflowStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const handleSave = useCallback((data: Partial<NodeData>) => {
    if (selectedNodeId) {
      updateNode(selectedNodeId, data);
    }
  }, [selectedNodeId, updateNode]);

  const handleDelete = useCallback(() => {
    if (selectedNodeId) {
      deleteNode(selectedNodeId);
    }
  }, [selectedNodeId, deleteNode]);

  if (!selectedNode || !selectedNode.data) {
    return (
      <div className="h-full flex flex-col bg-slate-50/50 p-10 font-sans">
        <div className="flex items-center justify-between mb-12">
           <div>
             <h2 className="text-xs font-black text-slate-800 uppercase tracking-[0.2em] leading-none mb-2">Properties</h2>
             <p className="text-[10px] font-bold text-slate-400">Select a node to configure.</p>
           </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
           <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mb-6 shadow-inner ring-4 ring-white">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
           </div>
           <p className="text-[11px] font-black text-slate-400 leading-relaxed uppercase tracking-wider">Select a node on the canvas to edit its properties</p>
        </div>
      </div>
    );
  }

  const nodeData = selectedNode.data as NodeData;
  const nodeType = nodeData.nodeType;

  const renderForm = () => {
    switch (nodeType) {
      case 'start':
        return <StartNodeForm data={nodeData as any} onSave={handleSave} />;
      case 'task':
        return <TaskNodeForm data={nodeData as any} onSave={handleSave} />;
      case 'approval':
        return <ApprovalNodeForm data={nodeData as any} onSave={handleSave} />;
      case 'automated':
        return <AutomatedStepForm data={nodeData as any} onSave={handleSave} />;
      case 'end':
        return <EndNodeForm data={nodeData as any} onSave={handleSave} />;
      default:
        return <div className="text-slate-500">Unknown node type</div>;
    }
  };

  const getNodeIcon = () => {
    switch (nodeType) {
      case 'start': return <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'task': return <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
      case 'approval': return <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
      case 'automated': return <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
      case 'end': return <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50/50 p-8 font-sans overflow-y-auto">
      <div className="flex items-center justify-between mb-10">
         <div>
           <h2 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] leading-none mb-2">Performance Details</h2>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Node Insight & Config</p>
         </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/50 p-6 mb-6 ring-1 ring-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border-2 border-slate-100 shadow-sm">
                {getNodeIcon()}
             </div>
             <div>
               <h3 className="text-base font-black text-slate-900 leading-tight capitalize tracking-tight">{nodeType} Configuration</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: {selectedNodeId}</p>
             </div>
          </div>
          <button
            onClick={handleDelete}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
            title="Remove Node"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>

        <div className="space-y-6">
          {renderForm()}
        </div>
      </div>

      <div className="mt-auto pt-8 border-t-2 border-slate-100">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Health Status</p>
         <div className="flex items-center justify-between px-4 py-3 bg-green-50 rounded-xl border-2 border-green-100/50 shadow-sm shadow-green-100/20">
            <span className="text-[11px] font-black text-green-700 uppercase tracking-tighter">Node Reachability</span>
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
               <span className="text-[11px] font-black text-green-700 uppercase">Operational</span>
             </div>
         </div>
      </div>
    </div>
  );
}

