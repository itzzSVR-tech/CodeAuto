import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { StartNodeData } from '../../store/types';

interface StartNodeProps {
  id: string;
  data: StartNodeData;
  selected?: boolean;
}

const StartNode = ({ data, selected }: StartNodeProps) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-md border-2 transition-all min-w-[200px] overflow-hidden
        ${selected ? 'border-indigo-500 shadow-indigo-100 ring-4 ring-indigo-50' : 'border-slate-200'}
      `}
    >
      {/* Header Bar */}
      <div className="h-1.5 bg-green-500" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center border border-green-100 shadow-sm shadow-green-50">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-display font-bold text-slate-900 leading-tight text-base tracking-tight">
              {data.label || 'Start'}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <p className="text-sm font-bold text-slate-800">{data.title || 'Initialize Flow'}</p>
          <p className="text-xs font-medium text-slate-400 leading-relaxed">Entry point for the workflow</p>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            <span>Ready</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100">ID: START</div>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-white !-bottom-1.5 hover:!scale-125 transition-transform"
      />
    </div>
  );
};

export default memo(StartNode);
