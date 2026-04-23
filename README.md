# CodeAuto

A visual workflow designer for HR processes built with React and React Flow. This prototype allows HR admins to create, configure, and test internal workflows such as onboarding, leave approval, or document verification.

## Features

- **Drag-and-Drop Canvas**: Build workflows by dragging nodes from a sidebar
- **5 Node Types**: Start, Task, Approval, Automated Step, and End nodes
- **Custom Node Forms**: Edit node properties with type-specific forms
- **Workflow Validation**: Real-time validation for structural issues
- **Simulation Testing**: Test workflows with mock API execution
- **Visual Execution Log**: Step-by-step workflow execution results

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| React Flow (@xyflow/react) | Diagram/flow canvas |
| Zustand | State management |
| React Hook Form | Form handling |
| MSW (Mock Service Worker) | API mocking |
| Tailwind CSS | Styling |
| Vite | Build tool |

## Project Structure

```
src/
├── components/
│   ├── Canvas/          # Workflow canvas and sidebar
│   │   ├── WorkflowCanvas.tsx
│   │   ├── Sidebar.tsx
│   │   └── Controls.tsx
│   ├── Nodes/           # Custom React Flow node components
│   │   ├── StartNode.tsx
│   │   ├── TaskNode.tsx
│   │   ├── ApprovalNode.tsx
│   │   ├── AutomatedStepNode.tsx
│   │   ├── EndNode.tsx
│   │   └── index.ts
│   ├── Forms/           # Node configuration forms
│   │   ├── NodeFormPanel.tsx
│   │   ├── StartNodeForm.tsx
│   │   ├── TaskNodeForm.tsx
│   │   ├── ApprovalNodeForm.tsx
│   │   ├── AutomatedStepForm.tsx
│   │   └── EndNodeForm.tsx
│   └── Sandbox/         # Testing and simulation UI
│       ├── TestPanel.tsx
│       └── ExecutionLog.tsx
├── hooks/               # Custom React hooks
├── store/               # Zustand state management
│   ├── workflowStore.ts
│   └── types.ts
├── services/            # API layer (future)
├── utils/               # Helper functions
├── mocks/               # MSW mock handlers
│   ├── browser.ts
│   └── handlers.ts
├── App.tsx
└── main.tsx
```

## Architecture Decisions

### State Management (Zustand)

We chose Zustand over Redux because:
- Minimal boilerplate for a prototype
- Direct state mutations with Immer-like syntax
- Easy to extend with middleware
- Tree-shakable and lightweight

The store centralizes:
- Canvas state (nodes, edges, selection)
- API state (automations, simulation results)
- Validation errors

### Node Type Registry

Nodes are registered in `components/Nodes/index.ts` as a map of type strings to components. This pattern:
- Makes adding new node types trivial
- Keeps React Flow configuration clean
- Enables type-safe node rendering

### Form Architecture

Each node type has a dedicated form component using React Hook Form:
- Forms are controlled components that call `onSave` on every change
- State syncs to Zustand store in real-time
- Easy to add validation rules per field
- Forms can be extended with more fields without canvas changes

### Mock API Layer

MSW intercepts requests at the network level:
- Same API code works for mock and real backends
- `/api/automations` returns available automated actions
- `/api/simulate` performs topological sort and returns execution steps
- Easy to swap for real API by changing base URL

### Validation Pipeline

The `validateWorkflow` function in the store runs:
1. Start node existence check
2. End node existence check
3. Disconnected node detection
4. Cycle detection using DFS

Validation runs on every canvas change and before simulation.

## Node Types

### Start Node
- Entry point for any workflow
- Fields: title, metadata (key-value pairs)
- Only has output handle

### Task Node
- Human task assignment
- Fields: title (required), description, assignee, due date, custom fields
- Has input and output handles

### Approval Node
- Manager/HR approval step
- Fields: title, approver role (dropdown), auto-approve threshold (hours)
- Has input and output handles

### Automated Step Node
- System-triggered action
- Fields: title, action (from mock API), action parameters
- Parameters dynamically shown based on selected action
- Has input and output handles

### End Node
- Workflow completion
- Fields: end message, show summary toggle
- Only has input handle

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd hr-workflow-designer
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Mock API Endpoints

### GET /api/automations

Returns available automated actions:

```json
[
  {
    "id": "send_email",
    "label": "Send Email",
    "params": ["to", "subject", "body"]
  },
  {
    "id": "generate_doc",
    "label": "Generate Document",
    "params": ["template", "recipient", "format"]
  }
]
```

### POST /api/simulate

Accepts workflow graph and returns execution:

```json
{
  "success": true,
  "steps": [
    {
      "step": 1,
      "nodeId": "node-1",
      "nodeType": "start",
      "action": "Initialize Workflow",
      "status": "completed",
      "message": "Workflow started: Onboarding"
    }
  ],
  "errors": []
}
```

## Assumptions

- Single workflow per session (no persistence)
- No authentication required
- Automated step parameters are simple key-value pairs
- Focus on functionality over pixel-perfect UI
- Cycles are detected but not prevented during creation

## Future Enhancements

- Workflow persistence (save/load)
- Import/export as JSON
- Copy/paste nodes
- Undo/redo functionality
- Real backend integration
- More node types (conditionals, parallel branches)
- Drag-to-reorder nodes
- Minimap for large workflows

## License

MIT
