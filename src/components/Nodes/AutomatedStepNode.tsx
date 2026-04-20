import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { AutomatedStepNodeData } from '../../store/types';

interface AutomatedStepNodeProps {
  id: string;
  data: AutomatedStepNodeData;
  selected?: boolean;
}

const AutomatedStepNode = ({ data, selected }: AutomatedStepNodeProps) => {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-md border-2 transition-all min-w-[260px] overflow-hidden
        ${selected ? 'border-indigo-500 shadow-indigo-100 ring-4 ring-indigo-50' : 'border-slate-200'}
      `}
    >
      <div className="h-1.5 bg-orange-500" />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm shadow-orange-50">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-display font-bold text-slate-900 leading-tight text-base tracking-tight">
              {data.label || 'Automated'}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-sm font-bold text-slate-800">{data.title || 'Execute Automation'}</p>
          <div className="flex items-center gap-2 mt-2">
             <div className="bg-orange-100 px-2 py-0.5 rounded-lg border border-orange-200 shadow-sm shadow-orange-50">
               <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest leading-none py-0.5">{data.actionId || 'SYNC_DATA'}</p>
             </div>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-100">
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2 leading-none">System Status</p>
           <div className="flex items-center gap-2.5 mt-1 bg-slate-50 p-2 rounded-xl border border-slate-100 shadow-inner shadow-slate-100/50">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Active Operation...</span>
           </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-orange-500 !border-2 !border-white !-top-1.5 hover:!scale-125 transition-transform"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-orange-500 !border-2 !border-white !-bottom-1.5 hover:!scale-125 transition-transform"
      />
    </div>
  );
};

export default memo(AutomatedStepNode);
