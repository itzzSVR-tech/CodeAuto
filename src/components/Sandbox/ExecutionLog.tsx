import type { SimulationStep } from '../../store/types';

interface ExecutionLogProps {
  steps: SimulationStep[];
}

export default function ExecutionLog({ steps }: ExecutionLogProps) {
  if (steps.length === 0) {
    return <div className="text-gray-400 text-sm">No execution steps</div>;
  }

  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div
          key={step.nodeId}
          className={`
            flex items-start gap-3 p-3 rounded-md
            ${step.status === 'completed' ? 'bg-green-50' : 'bg-gray-50'}
          `}
        >
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-medium">
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">{step.action}</span>
              <span className="text-xs text-gray-500">[{step.nodeType}]</span>
            </div>
            <p className="text-xs text-gray-600 mt-1 truncate">{step.message}</p>
          </div>
          <span
            className={`
              text-xs px-2 py-1 rounded
              ${step.status === 'completed' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}
            `}
          >
            {step.status}
          </span>
        </div>
      ))}
    </div>
  );
}
