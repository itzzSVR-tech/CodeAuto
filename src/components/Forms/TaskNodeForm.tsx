import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import type { TaskNodeData } from '../../store/types';

interface TaskNodeFormProps {
  data: TaskNodeData;
  onSave: (data: Partial<TaskNodeData>) => void;
}

interface FormData {
  label: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: string;
}

export default function TaskNodeForm({ data, onSave }: TaskNodeFormProps) {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      label: data.label || 'Task',
      title: data.title || '',
      description: data.description || '',
      assignee: data.assignee || '',
      dueDate: data.dueDate || '',
      customFields: data.customFields ? Object.entries(data.customFields).map(([k, v]) => `${k}:${v}`).join(', ') : '',
    }
  });

  const values = watch();

  useEffect(() => {
    const subscription = watch((value) => {
      const customFieldsObj: Record<string, string> = {};
      if (value.customFields) {
        value.customFields.split(',').forEach(pair => {
          const [k, v] = pair.split(':');
          if (k && v) customFieldsObj[k.trim()] = v.trim();
        });
      }
      onSave({
        label: value.label || 'Task',
        title: value.title || '',
        description: value.description || '',
        assignee: value.assignee || '',
        dueDate: value.dueDate || '',
        customFields: Object.keys(customFieldsObj).length > 0 ? customFieldsObj : {},
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Task"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          {...register('title', { required: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Collect Documents"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          {...register('description')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={2}
          placeholder="Gather all required onboarding documents"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
        <input
          {...register('assignee')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="HR Coordinator"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
        <input
          {...register('dueDate')}
          type="date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Fields (key:value, comma separated)</label>
        <input
          {...register('customFields')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="priority:high, category:onboarding"
        />
      </div>
    </form>
  );
}
