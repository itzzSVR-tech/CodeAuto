import { useReactFlow } from '@xyflow/react';

interface ControlsProps {
  onReset: () => void;
  onTest: () => void;
  isValid: boolean;
}

export default function Controls({ onReset, onTest, isValid }: ControlsProps) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6 bg-white/90 backdrop-blur-md px-6 py-3.5 rounded-3xl shadow-2xl border border-slate-200/60">
      <div className="flex items-center gap-2 pr-6 border-r-2 border-slate-200">
        <button
          onClick={() => zoomIn()}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all hover:text-indigo-600 active:scale-90"
          title="Zoom in"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        </button>
        <button
          onClick={() => zoomOut()}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all hover:text-indigo-600 active:scale-90"
          title="Zoom out"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
        </button>
        <button
          onClick={() => fitView({ padding: 0.2 })}
          className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-all hover:text-indigo-600 active:scale-90"
          title="Fit view"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          className="px-5 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-red-600 rounded-xl text-sm font-bold transition-all flex items-center gap-2.5 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          Clear Canvas
        </button>
        
        <button
          onClick={onTest}
          disabled={!isValid}
          className={`
            px-6 py-3 rounded-xl text-sm font-black shadow-xl transition-all flex items-center gap-3 active:scale-95
            ${isValid
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 shadow-indigo-100'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Test Workflow
        </button>
      </div>
    </div>
  );
}
