import React, { useMemo, useRef, useCallback } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  Handle,
  Position,
  Panel,
  MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import * as htmlToImage from "html-to-image";
import logo from "../../assets/bg_removed_logo.png";

// ─── Custom Stage Node ────────────────────────────────────────────────────────
const StageNode = ({ data }) => {
  return (
    <div className="px-4 py-3 rounded-md shadow-[3px_3px_0_0_rgba(30,41,59,1)] border-2 border-slate-800 bg-[#fffdf0] min-w-[220px] max-w-[240px] text-center relative z-10">
      <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-slate-800 !border-0" />
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-[0.9rem] font-bold text-slate-900 leading-snug">
          {data.label || `Stage ${data.stageIndex + 1}`}
        </h3>
      </div>
      
      <Handle type="source" position={Position.Left} id="left" className="!w-2 !h-2 !bg-slate-800 !border-0" style={{ top: '50%' }} />
      <Handle type="source" position={Position.Right} id="right" className="!w-2 !h-2 !bg-slate-800 !border-0" style={{ top: '50%' }} />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!w-2 !h-2 !bg-slate-800 !border-0" />
    </div>
  );
};

// ─── Custom Skill Group Node ──────────────────────────────────────────────────
const SkillGroupNode = ({ data }) => {
  return (
    <div className="flex flex-col gap-1.5 w-[200px] relative">
      <Handle 
        type="target" 
        position={data.isLeft ? Position.Right : Position.Left} 
        className="!w-2 !h-2 !bg-slate-800 !border-0"
        style={{ top: '20px' }} // Align with the center of the first skill box
      />
      {data.skills.map((skill, idx) => (
        <div key={skill.id || idx} className="px-3 py-2.5 rounded-md shadow-[2px_2px_0_0_rgba(30,41,59,1)] border-2 border-slate-800 bg-white text-center hover:bg-slate-50 transition-colors">
          <span className="text-[0.75rem] font-bold text-slate-800 leading-tight block">{skill.name}</span>
        </div>
      ))}
    </div>
  );
};

const nodeTypes = {
  stage: StageNode,
  skillGroup: SkillGroupNode,
};

// ─── Roadmap Visualizer Component ─────────────────────────────────────────────
const RoadmapVisualizer = ({ roadmap }) => {
  const reactFlowWrapper = useRef(null);

  const { initialNodes, initialEdges } = useMemo(() => {
    const nodes = [];
    const edges = [];
    let currentY = 50;
    let isLeft = true; // Alternate sides per Stage

    const centerX = 500;

    roadmap.stages.forEach((stage, sIdx) => {
      const stageId = String(stage.id || `stage-${sIdx}`);
      
      // 1. Stage Node (Spine)
      nodes.push({
        id: stageId,
        type: "stage",
        data: { label: stage.title, stageIndex: sIdx },
        position: { x: centerX - 110, y: currentY }, // Center node (220px width -> half is 110)
      });

      // Connect to previous stage (Central Spine)
      if (sIdx > 0) {
        const prevStageId = String(roadmap.stages[sIdx - 1].id || `stage-${sIdx - 1}`);
        edges.push({
          id: `e-${prevStageId}-${stageId}`,
          source: prevStageId,
          target: stageId,
          sourceHandle: "bottom",
          type: "straight",
          style: { stroke: "#475569", strokeWidth: 3 }, // Solid dark gray spine
          markerEnd: { type: MarkerType.ArrowClosed, color: "#475569" },
        });
      }

      // 2. Skill Group Node (Ribs)
      if (stage.skills && stage.skills.length > 0) {
        const groupId = `group-${stageId}`;
        const xPos = isLeft ? 140 : 660; 
        
        nodes.push({
          id: groupId,
          type: "skillGroup",
          data: { skills: stage.skills, isLeft: isLeft },
          position: { x: xPos, y: currentY },
        });

        // Connect Stage to Skill Group
        edges.push({
          id: `e-${stageId}-group`,
          source: stageId,
          target: groupId,
          sourceHandle: isLeft ? "left" : "right",
          type: "step",
          style: { stroke: "#64748b", strokeWidth: 2, strokeDasharray: "4 4" }, // Dashed step lines for branching
          markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
        });
      }

      // Calculate Y jump for next stage based on tallest element
      const stageHeight = 60;
      const groupHeight = stage.skills ? stage.skills.length * (38 + 6) : 0; // Approx 38px per skill + 6px gap
      currentY += Math.max(stageHeight, groupHeight) + 40; // 40px gap before next stage

      isLeft = !isLeft; // Alternate side for next stage
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [roadmap]);

  // Download functionality
  const downloadImage = useCallback(() => {
    if (reactFlowWrapper.current === null) {
      return;
    }
    // We get the DOM element of the ReactFlow pane
    const flowElement = reactFlowWrapper.current.querySelector(".react-flow__pane");
    if (!flowElement) return;

    htmlToImage
      .toPng(reactFlowWrapper.current, {
        backgroundColor: '#f8fafc',
        width: 1000,
        height: initialNodes[initialNodes.length - 1].position.y + 200, // Estimate full height
        style: {
          width: '1000px',
          height: `${initialNodes[initialNodes.length - 1].position.y + 200}px`,
          transform: 'translate(0, 0) scale(1)'
        }
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${roadmap.title.toLowerCase().replace(/\s+/g, '-')}-roadmap.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Oops, something went wrong!", err);
      });
  }, [roadmap, initialNodes]);

  return (
    <div className="w-full h-[800px] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-[#f8fafc] relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: window.innerWidth > 768 ? 150 : 20, y: 50, zoom: window.innerWidth > 768 ? 1 : 0.6 }}
        minZoom={0.2}
        maxZoom={1.5}
        className="download-flow"
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Background color="#cbd5e1" gap={24} size={2} />
        <Controls className="bg-white border-slate-200 fill-slate-700" />
        <Panel position="top-right" className="m-4">
          <button
            onClick={downloadImage}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl shadow-[4px_4px_0_0_rgba(100,116,139,1)] border-2 border-slate-900 hover:bg-slate-800 transition-all font-bold text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download Roadmap
          </button>
        </Panel>
      </ReactFlow>

      {/* Brand Watermark (visible in download) */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4 z-10 pointer-events-none bg-white/80 p-3 rounded-xl border border-slate-200 shadow-sm backdrop-blur-sm">
         <img src={logo} alt="Invikt AI" className="h-10 w-auto object-contain drop-shadow-sm" />
         <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Invikt AI</h1>
            <p className="text-[0.65rem] uppercase tracking-widest text-slate-600 font-bold mt-1">Official Career Roadmap</p>
         </div>
      </div>
    </div>
  );
};

export default RoadmapVisualizer;
