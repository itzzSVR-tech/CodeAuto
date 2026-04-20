import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { TaskNodeData } from '../../store/types';

interface TaskNodeProps {
  id: string;
  data: TaskNodeData;
  selected?: boolean;
}

const TaskNode = ({ data, selected }: TaskNodeProps) => {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-md border-2 transition-all min-w-[260px] overflow-hidden
        ${selected ? 'border-indigo-500 shadow-indigo-100 ring-4 ring-indigo-50' : 'border-slate-200'}
      `}
    >
      <div className="h-1.5 bg-blue-500" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm shadow-blue-50">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <span className="font-display font-bold text-slate-900 leading-tight text-base tracking-tight">
              {data.label || 'Task'}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="mb-6 space-y-2">
          <p className="text-sm font-bold text-slate-800">{data.title || 'New Task'}</p>
          <p className="text-xs font-medium text-slate-400 leading-relaxed line-clamp-2">{data.description || 'No description provided'}</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-2 pt-5 border-t border-slate-100">
          <div className="flex flex-col items-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100 shadow-sm shadow-slate-100/20">
            <div className="flex items-center gap-1.5 mb-0.5">
               <svg className="w-2.5 h-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
               <span className="text-[10px] font-black text-slate-700">11</span>
            </div>
          </div>
          <div className="flex flex-col items-center py-2 px-1 rounded-xl bg-slate-50 border border-slate-100 shadow-sm shadow-slate-100/20">
            <div className="flex items-center gap-1.5 mb-0.5">
               <svg className="w-2.5 h-2.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
               <span className="text-[10px] font-black text-slate-700">27</span>
            </div>
          </div>
          <div className="flex flex-col items-center py-2 px-1 rounded-xl bg-green-50 border-2 border-green-100 shadow-sm shadow-green-100/20">
            <div className="flex items-center gap-1.5 mb-0.5">
               <svg className="w-2.5 h-2.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7"/></svg>
               <span className="text-[10px] font-black text-green-700">41</span>
            </div>
          </div>
          <div className="flex flex-col items-center py-2 px-1 rounded-xl bg-indigo-50 border border-indigo-100 shadow-sm shadow-indigo-100/20">
            <div className="flex items-center gap-1.5 mb-0.5">
               <svg className="w-2.5 h-2.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
               <span className="text-[10px] font-black text-indigo-700">72</span>
            </div>
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !-top-1.5 hover:!scale-125 transition-transform"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white !-bottom-1.5 hover:!scale-125 transition-transform"
      />
    </div>
  );
};

export default memo(TaskNode);
