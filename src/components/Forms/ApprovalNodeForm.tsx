import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import type { ApprovalNodeData } from '../../store/types';

interface ApprovalNodeFormProps {
  data: ApprovalNodeData;
  onSave: (data: Partial<ApprovalNodeData>) => void;
}

interface FormData {
  label: string;
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export default function ApprovalNodeForm({ data, onSave }: ApprovalNodeFormProps) {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      label: data.label || 'Approval',
      title: data.title || '',
      approverRole: data.approverRole || 'Manager',
      autoApproveThreshold: data.autoApproveThreshold || 0,
    }
  });

  const values = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      onSave({
        label: value.label || 'Approval',
        title: value.title || '',
        approverRole: value.approverRole || 'Manager',
        autoApproveThreshold: Number(value.autoApproveThreshold) || 0,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Node Label</label>
        <input
          {...register('label')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Approval"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Manager Approval"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Approver Role</label>
        <select
          {...register('approverRole')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
          <option value="VP">VP</option>
          <option value="HR Admin">HR Admin</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Auto-Approve Threshold (hours)</label>
        <input
          {...register('autoApproveThreshold')}
          type="number"
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="24"
        />
        <p className="text-xs text-gray-500 mt-1">Auto-approve after this many hours</p>
      </div>
    </form>
  );
}
