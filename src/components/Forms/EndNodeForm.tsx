import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import type { EndNodeData } from '../../store/types';

interface EndNodeFormProps {
  data: EndNodeData;
  onSave: (data: Partial<EndNodeData>) => void;
}

interface FormData {
  label: string;
  endMessage: string;
  showSummary: boolean;
}

export default function EndNodeForm({ data, onSave }: EndNodeFormProps) {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      label: data.label || 'End',
      endMessage: data.endMessage || '',
      showSummary: data.showSummary || false,
    }
  });

  const values = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      onSave({
        label: value.label || 'End',
        endMessage: value.endMessage || '',
        showSummary: !!value.showSummary,
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="End"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">End Message</label>
        <input
          {...register('endMessage')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="Workflow completed successfully"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('showSummary')}
          id="showSummary"
          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
        />
        <label htmlFor="showSummary" className="text-sm font-medium text-gray-700">
          Show Summary Report
        </label>
      </div>
    </form>
  );
}
