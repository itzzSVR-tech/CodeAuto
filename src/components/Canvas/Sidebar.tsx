import React from 'react';
import type { NodeType } from "../../store/types";

interface SidebarProps {
    onDragStart: (event: React.DragEvent, nodeType: NodeType) => void;
}

const nodePalette: Array<{
    type: NodeType;
    label: string;
    icon: React.ReactNode;
    color: string;
}> = [
    {
        type: "start",
        label: "Start Flow",
        color: "border-green-200 bg-green-50 text-green-700",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
    {
        type: "task",
        label: "Action Task",
        color: "border-blue-200 bg-blue-50 text-blue-700",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
            </svg>
        ),
    },
    {
        type: "approval",
        label: "Approval Gate",
        color: "border-purple-200 bg-purple-50 text-purple-700",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
            </svg>
        ),
    },
    {
        type: "automated",
        label: "Automation Step",
        color: "border-orange-200 bg-orange-50 text-orange-700",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
    },
    {
        type: "end",
        label: "End Flow",
        color: "border-red-200 bg-red-50 text-red-700",
        icon: (
            <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        ),
    },
];

export default function Sidebar({ onDragStart }: SidebarProps) {
    return (
        <div className="w-72 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto font-sans shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            <div className="p-10 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm mb-16">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                        <span className="text-white font-black text-base tracking-tighter">CA</span>
                    </div>
                    <div>
                      <span className="font-display font-black text-slate-900 tracking-tight text-xl block leading-none">
                          CodeAuto
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5 block">Orchestrator</span>
                    </div>
                </div>

                {/* Navigation Categories */}
                <nav className="space-y-16">
                    <div>
                        <div className="flex items-center gap-4 mb-8 px-2">
                            <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em]">
                                General
                            </p>
                            <div className="h-px flex-1 bg-slate-200/60" />
                        </div>
                        <ul className="space-y-6">
                            <li className="flex items-center justify-between px-6 py-4 bg-white text-indigo-700 rounded-3xl font-black text-sm border-2 border-indigo-100 cursor-pointer shadow-md shadow-indigo-100/30 hover:border-indigo-300 transition-all active:scale-95">
                                <div className="flex items-center gap-5">
                                    <div className="w-6 h-6 bg-indigo-600 rounded-xl shadow-indigo-200 shadow-lg flex items-center justify-center">
                                       <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                                    </div>
                                    Dashboard
                                </div>
                            </li>
                            <li className="flex items-center gap-5 px-6 py-4 text-slate-500 hover:bg-slate-50 rounded-3xl text-sm font-black transition-all cursor-pointer group active:scale-95">
                                <div className="w-6 h-6 border-2 border-slate-300 rounded-xl group-hover:border-indigo-400 transition-colors" />
                                Compliance
                            </li>
                            <li className="flex items-center justify-between px-6 py-4 text-slate-500 hover:bg-slate-50 rounded-3xl text-sm font-black transition-all cursor-pointer group active:scale-95">
                                <div className="flex items-center gap-5">
                                    <div className="w-6 h-6 border-2 border-slate-300 rounded-xl group-hover:border-indigo-400 transition-colors" />
                                    Scheduler
                                </div>
                                <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full font-black text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700 transition-colors">
                                    11
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-6 px-1">
                            <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">
                                Node Palette
                            </p>
                            <div className="h-px flex-1 bg-slate-200/60" />
                        </div>
                        <div className="space-y-4">
                            {nodePalette.map((node) => (
                                <div
                                    key={node.type}
                                    className={`
                    flex items-center gap-4 px-5 py-4 rounded-2xl border-2 cursor-grab active:cursor-grabbing
                    ${node.color} transition-all hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden
                  `}
                                    draggable
                                    onDragStart={(event) =>
                                        onDragStart(event, node.type)
                                    }
                                >
                                    <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-20 transition-opacity">
                                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm4-8h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/></svg>
                                    </div>
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/50">
                                        {node.icon}
                                    </div>
                                    <span className="text-sm font-black truncate tracking-tight">
                                        {node.label}
                                    </span>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                                        <svg
                                            className="w-4 h-4 text-slate-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>

            <div className="mt-auto p-10 space-y-4 border-t border-slate-50">
                <div className="flex items-center gap-4 px-5 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl text-sm font-bold transition-all cursor-pointer group">
                    <div className="p-2 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                      </svg>
                    </div>
                    Settings
                </div>
                <div className="flex items-center gap-4 px-5 py-3 text-slate-500 hover:bg-slate-50 rounded-2xl text-sm font-bold transition-all cursor-pointer group">
                    <div className="p-2 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                      </svg>
                    </div>
                    Help & Support
                </div>
            </div>
        </div>
    );
}
