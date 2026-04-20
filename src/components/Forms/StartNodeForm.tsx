import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import type { StartNodeData } from '../../store/types';

interface StartNodeFormProps {
  data: StartNodeData;
  onSave: (data: Partial<StartNodeData>) => void;
}

interface FormData {
  label: string;
  title: string;
  metadata: string;
}

export default function StartNodeForm({ data, onSave }: StartNodeFormProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      label: data.label || '',
      title: data.title || '',
      metadata: data.metadata ? Object.entries(data.metadata).map(([k, v]) => `${k}:${v}`).join(', ') : '',
    }
  });

  const values = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      const metadataObj: Record<string, string> = {};
      if (value.metadata) {
        value.metadata.split(',').forEach(pair => {
          const [k, v] = pair.split(':');
          if (k && v) metadataObj[k.trim()] = v.trim();
        });
      }
      onSave({
        label: value.label,
        title: value.title,
        metadata: Object.keys(metadataObj).length > 0 ? metadataObj : undefined,
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Start"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="Workflow Start"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Metadata (key:value, comma separated)</label>
        <input
          {...register('metadata')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
          placeholder="version:1.0, department:HR"
        />
      </div>
    </form>
  );
}
