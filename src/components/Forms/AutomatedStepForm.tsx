import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import type { AutomatedStepNodeData } from '../../store/types';
import { useWorkflowStore } from '../../store/workflowStore';

interface AutomatedStepFormProps {
  data: AutomatedStepNodeData;
  onSave: (data: Partial<AutomatedStepNodeData>) => void;
}

interface FormData {
  label: string;
  title: string;
  actionId: string;
  actionParams: string;
}

export default function AutomatedStepForm({ data, onSave }: AutomatedStepFormProps) {
  const automations = useWorkflowStore((state) => state.automations);
  const [selectedAction, setSelectedAction] = useState<string>(data.actionId || '');

  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      label: data.label || 'Automated',
      title: data.title || '',
      actionId: data.actionId || '',
      actionParams: data.actionParams ? Object.entries(data.actionParams).map(([k, v]) => `${k}:${v}`).join(', ') : '',
    }
  });

  const values = watch();

  const selectedAutomation = automations.find(a => a.id === selectedAction);

  useEffect(() => {
    const subscription = watch((value) => {
      const actionParamsObj: Record<string, string> = {};
      if (value.actionParams) {
        value.actionParams.split(',').forEach(pair => {
          const [k, v] = pair.split(':');
          if (k && v) actionParamsObj[k.trim()] = v.trim();
        });
      }
      onSave({
        label: value.label || 'Automated',
        title: value.title || '',
        actionId: value.actionId || '',
        actionParams: actionParamsObj,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, onSave]);

  const handleActionChange = (actionId: string) => {
    setSelectedAction(actionId);
    setValue('actionId', actionId);
    // Reset params when action changes
    setValue('actionParams', '');
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Node Label</label>
        <input
          {...register('label')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Automated"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Send Welcome Email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
        <select
          value={selectedAction}
          onChange={(e) => handleActionChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Select an action...</option>
          {automations.map((automation) => (
            <option key={automation.id} value={automation.id}>
              {automation.label}
            </option>
          ))}
        </select>
      </div>
      {selectedAutomation && (
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-xs font-medium text-gray-600 mb-2">Required Parameters:</p>
          <div className="flex flex-wrap gap-1">
            {selectedAutomation.params.map((param) => (
              <span key={param} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                {param}
              </span>
            ))}
          </div>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Parameters (key:value, comma separated)
        </label>
        <input
          {...register('actionParams')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder={selectedAutomation ? `e.g., ${selectedAutomation.params[0]}:value` : 'Select an action first'}
          disabled={!selectedAction}
        />
      </div>
    </form>
  );
}
