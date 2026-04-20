import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { EndNodeData } from '../../store/types';

interface EndNodeProps {
  id: string;
  data: EndNodeData;
  selected?: boolean;
}

const EndNode = ({ data, selected }: EndNodeProps) => {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-md border-2 transition-all min-w-[220px] overflow-hidden
        ${selected ? 'border-indigo-500 shadow-indigo-100 ring-4 ring-indigo-50' : 'border-slate-200'}
      `}
    >
      <div className="h-1.5 bg-red-500" />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center border border-red-100 shadow-sm shadow-red-50">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="font-display font-bold text-slate-900 leading-tight text-base tracking-tight">
              {data.label || 'End'}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <p className="text-sm font-bold text-slate-800">{data.endMessage || 'Workflow Completed'}</p>
          <p className="text-xs font-medium text-slate-400">Final step of the process</p>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
          <span className="bg-red-50 text-red-700 px-2.5 py-1 rounded-lg border border-red-100 shadow-sm shadow-red-50 uppercase tracking-widest">Termination</span>
          {data.showSummary && <span className="text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">Summary: ON</span>}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-red-500 !border-2 !border-white !-top-1.5 hover:!scale-125 transition-transform"
      />
    </div>
  );
};

export default memo(EndNode);
