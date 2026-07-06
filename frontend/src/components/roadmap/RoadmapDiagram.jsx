import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import RoadmapNode from './RoadmapNode';
import NodeSidebar from './NodeSidebar';
import './roadmapDiagram.css';

// Register custom node types
const nodeTypes = {
  roadmapNode: RoadmapNode,
};

// Edge style — the connecting lines
const defaultEdgeOptions = {
  style: {
    stroke: '#c4b5fd',
    strokeWidth: 1.5,
  },
  type: 'smoothstep',
  animated: false,
};

const RoadmapDiagram = ({ roadmapData }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [learnedNodes, setLearnedNodes] = useState(new Set());

  // Convert roadmap JSON into React Flow nodes
  const buildNodes = useCallback(() => {
    const nodes = [];
    let yOffset = 0;

    roadmapData.stages.forEach((stage, stageIndex) => {
      const stageX = 400;

      // Stage label node (the purple section header)
      nodes.push({
        id: `stage-${stage.id}`,
        type: 'roadmapNode',
        position: { x: stageX, y: yOffset },
        data: {
          label: `Stage ${stage.number || stageIndex + 1} — ${stage.title}`,
          type: 'section',
        },
        draggable: false,
      });

      yOffset += 70;

      // Skill nodes for this stage
      if (stage.skills) {
        stage.skills.forEach((skill, skillIndex) => {
          const isEven = skillIndex % 2 === 0;
          const xPos = isEven ? stageX - 180 : stageX + 180;

          nodes.push({
            id: skill.id,
            type: 'roadmapNode',
            position: {
              x: xPos,
              y: yOffset + skillIndex * 80
            },
            data: {
              label: skill.name,
              type: skill.level === 'Beginner'
                ? 'subtopic'
                : skill.level === 'Advanced'
                ? 'required'
                : 'subtopic',
              level: skill.level,
              description: skill.description,
              estimated_hours: skill.estimated_hours,
              resources: skill.resources,
              onClick: (data) => setSelectedNode(data),
            },
            draggable: false,
          });
        });

        yOffset += stage.skills.length * 80 + 60;
      }
    });

    return nodes;
  }, [roadmapData]);

  // Build connecting edges between nodes
  const buildEdges = useCallback(() => {
    const edges = [];

    roadmapData.stages.forEach((stage, stageIndex) => {
      // Connect stage header to first skill
      if (stage.skills && stage.skills.length > 0) {
        edges.push({
          id: `e-stage-${stage.id}-first`,
          source: `stage-${stage.id}`,
          target: stage.skills[0].id,
          ...defaultEdgeOptions,
        });

        // Connect skills within stage sequentially
        stage.skills.forEach((skill, skillIndex) => {
          if (skillIndex < stage.skills.length - 1) {
            edges.push({
              id: `e-${skill.id}-${stage.skills[skillIndex + 1].id}`,
              source: skill.id,
              target: stage.skills[skillIndex + 1].id,
              ...defaultEdgeOptions,
            });
          }
        });

        // Connect last skill of stage to next stage header
        if (
          stageIndex < roadmapData.stages.length - 1 &&
          roadmapData.stages[stageIndex + 1].skills && 
          roadmapData.stages[stageIndex + 1].skills.length > 0
        ) {
          const lastSkill = stage.skills[stage.skills.length - 1];
          const nextStage = roadmapData.stages[stageIndex + 1];
          edges.push({
            id: `e-${lastSkill.id}-stage-${nextStage.id}`,
            source: lastSkill.id,
            target: `stage-${nextStage.id}`,
            style: {
              stroke: '#7c3aed',
              strokeWidth: 2,
              strokeDasharray: '6 3',
            },
            type: 'smoothstep',
          });
        }
      }
    });

    return edges;
  }, [roadmapData]);

  const initialNodes = useMemo(() => buildNodes(), [buildNodes]);
  const initialEdges = useMemo(() => buildEdges(), [buildEdges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleMarkLearned = () => {
    if (!selectedNode) return;
    setLearnedNodes(prev => {
      const next = new Set(prev);
      if (next.has(selectedNode.id || selectedNode.label)) {
        next.delete(selectedNode.id || selectedNode.label);
      } else {
        next.add(selectedNode.id || selectedNode.label);
      }
      return next;
    });
  };

  const totalSkills = roadmapData.stages.reduce(
    (acc, s) => acc + (s.skills ? s.skills.length : 0), 0
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>

      {/* Progress Header */}
      <div style={{
        padding: '16px 24px',
        background: '#faf5ff',
        borderBottom: '1px solid #ede9fe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h2 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: '800',
            color: '#4c1d95',
            fontFamily: 'Manrope, sans-serif',
          }}>
            {roadmapData.icon && <span className="material-symbols-outlined align-middle mr-2">{roadmapData.icon}</span>}
            {roadmapData.title}
          </h2>
          <p style={{
            margin: '4px 0 0',
            fontSize: '12px',
            color: '#7c3aed',
          }}>
            {roadmapData.stages_count || roadmapData.stages.length} stages •
            {roadmapData.skills_count || totalSkills} skills •
            ~{roadmapData.estimated_time || roadmapData.stats?.estimatedTime}
          </p>
        </div>

        {/* Progress */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#7c3aed',
            fontFamily: 'Manrope, sans-serif',
          }}>
            {learnedNodes.size}/{totalSkills}
          </div>
          <div style={{
            fontSize: '11px',
            color: '#9ca3af',
            marginBottom: '6px',
          }}>
            skills learned
          </div>
          <div style={{
            width: '120px',
            height: '6px',
            background: '#ede9fe',
            borderRadius: '3px',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              borderRadius: '3px',
              background: 'linear-gradient(90deg, #a78bfa, #7c3aed)',
              width: `${totalSkills === 0 ? 0 : (learnedNodes.size / totalSkills) * 100}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{
        padding: '10px 24px',
        background: '#ffffff',
        borderBottom: '1px solid #f3f4f6',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600' }}>
          LEGEND:
        </span>
        {[
          { color: '#7c3aed', bg: '#f5f0ff', label: 'Stage Header' },
          { color: '#374151', bg: '#ffffff', border: '#ddd6fe', label: 'Skill (click to learn)' },
          { color: '#92400e', bg: '#fef3c7', border: '#f59e0b', label: 'Advanced Skill' },
          { color: '#166534', bg: '#f0fdf4', border: '#22c55e', label: 'Optional Skill' },
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '3px',
              background: item.bg,
              border: `1.5px solid ${item.border || item.color}`,
            }} />
            <span style={{
              fontSize: '11px',
              color: '#6b7280',
            }}>
              {item.label}
            </span>
          </div>
        ))}
        <span style={{
          marginLeft: 'auto',
          fontSize: '11px',
          color: '#9ca3af',
        }}>
          💡 Click any skill node to see resources
        </span>
      </div>

      {/* React Flow Diagram */}
      <div style={{ height: '80vh', background: '#fefefe' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={2}
          attributionPosition="bottom-left"
        >
          <Background
            color="#e5e7eb"
            gap={20}
            size={1}
            variant="dots"
          />
          <Controls
            style={{
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <MiniMap
            nodeColor={node => {
              if (node.data?.type === 'section') return '#7c3aed';
              if (learnedNodes.has(node.id)) return '#22c55e';
              return '#ddd6fe';
            }}
            style={{
              background: '#faf5ff',
              border: '1px solid #ede9fe',
              borderRadius: '8px',
            }}
          />
        </ReactFlow>
      </div>

      {/* Node Click Sidebar */}
      {selectedNode && (
        <NodeSidebar
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onMarkLearned={handleMarkLearned}
          isLearned={learnedNodes.has(
            selectedNode.id || selectedNode.label
          )}
        />
      )}
    </div>
  );
};

export default RoadmapDiagram;
