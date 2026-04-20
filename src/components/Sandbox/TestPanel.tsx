import { useWorkflowStore } from '../../store/workflowStore';
import type { SimulationStep } from '../../store/types';

export default function TestPanel() {
  const { simulationResult, isSimulating, clearSimulation } = useWorkflowStore();

  if (!simulationResult && !isSimulating) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {isSimulating ? 'Running Simulation...' : 'Workflow Simulation Results'}
          </h2>
          <button
            onClick={clearSimulation}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {isSimulating ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
            </div>
          ) : simulationResult ? (
            <div className="space-y-4">
              {/* Summary */}
              <div
                className={`p-4 rounded-lg ${
                  simulationResult.success
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {simulationResult.success ? '✅' : '❌'}
                  </span>
                  <span
                    className={`font-medium ${
                      simulationResult.success ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {simulationResult.success ? 'Workflow Valid' : 'Workflow Invalid'}
                  </span>
                </div>
                {simulationResult.errors.length > 0 && (
                  <ul className="mt-2 text-sm text-red-700 space-y-1">
                    {simulationResult.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Execution Steps */}
              {simulationResult.steps.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Execution Steps ({simulationResult.steps.length})
                  </h3>
                  <div className="space-y-2">
                    {simulationResult.steps.map((step) => (
                      <ExecutionStepItem key={step.nodeId} step={step} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="p-4 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={clearSimulation}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ExecutionStepItem({ step }: { step: SimulationStep }) {
  const getStatusColor = () => {
    switch (step.status) {
      case 'completed':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'skipped':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 border-gray-300 text-gray-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getNodeIcon = () => {
    switch (step.nodeType) {
      case 'start':
        return '🟢';
      case 'task':
        return '📋';
      case 'approval':
        return '🔐';
      case 'automated':
        return '⚙️';
      case 'end':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className={`p-3 rounded-lg border ${getStatusColor()}`}>
      <div className="flex items-center gap-3">
        <span className="text-lg">{getNodeIcon()}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">Step {step.step}</span>
            <span className="text-xs uppercase px-2 py-0.5 rounded bg-white/50">
              {step.nodeType}
            </span>
          </div>
          <p className="text-sm mt-1">{step.message}</p>
        </div>
        <span className="text-xs font-medium">{step.status}</span>
      </div>
    </div>
  );
}
