import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import type { ApprovalNodeData } from '../../store/types';

interface ApprovalNodeProps {
  id: string;
  data: ApprovalNodeData;
  selected?: boolean;
}

const ApprovalNode = ({ data, selected }: ApprovalNodeProps) => {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-md border-2 transition-all min-w-[260px] overflow-hidden
        ${selected ? 'border-indigo-500 shadow-indigo-100 ring-4 ring-indigo-50' : 'border-slate-200'}
      `}
    >
      <div className="h-1.5 bg-purple-500" />

      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100 shadow-sm shadow-purple-50">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-display font-bold text-slate-900 leading-tight text-base tracking-tight">
              {data.label || 'Approval'}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-sm font-bold text-slate-800">{data.title || 'Approval Request'}</p>
          <div className="flex items-center gap-2 mt-2">
             <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm">
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
             </div>
             <p className="text-xs text-slate-500 font-bold tracking-tight">{data.approverRole || 'Manager'}</p>
          </div>
        </div>

        {/* Action Badges */}
        <div className="flex gap-2.5 pt-5 border-t border-slate-100">
           <div className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-[10px] font-black border border-green-100 shadow-sm shadow-green-50 uppercase tracking-widest">APPROVE</div>
           <div className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 text-[10px] font-black border border-red-100 shadow-sm shadow-red-50 uppercase tracking-widest">REJECT</div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white !-top-1.5 hover:!scale-125 transition-transform"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-white !-bottom-1.5 hover:!scale-125 transition-transform"
      />
    </div>
  );
};

export default memo(ApprovalNode);
