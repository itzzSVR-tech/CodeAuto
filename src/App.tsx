import { useEffect } from 'react';
import { useWorkflowStore } from './store/workflowStore';
import WorkflowCanvas from './components/Canvas/WorkflowCanvas';
import TestPanel from './components/Sandbox/TestPanel';

function App() {
  const fetchAutomations = useWorkflowStore((state) => state.fetchAutomations);

  useEffect(() => {
    fetchAutomations();
  }, [fetchAutomations]);

  return (
    <div className="h-screen w-screen bg-slate-50 overflow-hidden">
      <main className="h-full w-full">
        <WorkflowCanvas />
      </main>
      <TestPanel />
    </div>
  );
}

export default App;
