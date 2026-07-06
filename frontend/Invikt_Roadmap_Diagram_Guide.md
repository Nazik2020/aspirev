# Invikt — Interactive Roadmap Visual Diagram
## Build roadmap.sh-style diagrams with Invikt branding

---

## What You Are Building

```
An interactive node-based roadmap diagram:
✓ Exactly like roadmap.sh visually
✓ Light theme with Invikt purple branding
✓ Clickable nodes that show resources
✓ Connecting lines between topics
✓ Zoom in/out + pan
✓ Beginner/Advanced color coding
✓ Built with React Flow (free, open source)
```

---

## Step 1 — Install React Flow

```bash
cd frontend
npm install reactflow
```

---

## Step 2 — The Complete File Structure

```
frontend/src/
└── components/
    └── roadmap/
        ├── RoadmapDiagram.jsx        ← main diagram
        ├── RoadmapNode.jsx           ← custom node
        ├── NodeSidebar.jsx           ← click sidebar
        └── roadmapDiagram.css        ← styles
```

---

## Step 3 — The Custom Node Component

```jsx
// src/components/roadmap/RoadmapNode.jsx

import { Handle, Position } from 'reactflow';

const TYPE_STYLES = {
  topic: {
    background: '#f5f0ff',
    border: '2px solid #7c3aed',
    color: '#4c1d95',
    fontWeight: '700',
  },
  subtopic: {
    background: '#ffffff',
    border: '1.5px solid #ddd6fe',
    color: '#374151',
    fontWeight: '500',
  },
  section: {
    background: '#7c3aed',
    border: 'none',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '13px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  required: {
    background: '#fef3c7',
    border: '1.5px solid #f59e0b',
    color: '#92400e',
    fontWeight: '500',
  },
  optional: {
    background: '#f0fdf4',
    border: '1.5px dashed #22c55e',
    color: '#166534',
    fontWeight: '500',
  }
};

const RoadmapNode = ({ data }) => {
  const style = TYPE_STYLES[data.type] || TYPE_STYLES.subtopic;

  return (
    <div
      style={{
        padding: data.type === 'section' ? '6px 16px' : '8px 14px',
        borderRadius: data.type === 'section' ? '6px' : '8px',
        fontSize: '12px',
        minWidth: data.type === 'section' ? '140px' : '120px',
        maxWidth: '200px',
        textAlign: 'center',
        cursor: data.type !== 'section' ? 'pointer' : 'default',
        boxShadow: data.type === 'topic'
          ? '0 2px 8px rgba(124, 58, 237, 0.15)'
          : '0 1px 3px rgba(0,0,0,0.08)',
        transition: 'all 0.2s ease',
        ...style
      }}
      onClick={() => data.onClick && data.onClick(data)}
      onMouseEnter={e => {
        if (data.type !== 'section') {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow =
            '0 4px 12px rgba(124, 58, 237, 0.25)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow =
          data.type === 'topic'
            ? '0 2px 8px rgba(124, 58, 237, 0.15)'
            : '0 1px 3px rgba(0,0,0,0.08)';
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0 }}
      />

      {data.label}

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ opacity: 0 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0 }}
      />
    </div>
  );
};

export default RoadmapNode;
```

---

## Step 4 — The Node Click Sidebar

```jsx
// src/components/roadmap/NodeSidebar.jsx

const RESOURCE_ICONS = {
  youtube:  '📺',
  courses:  '📚',
  docs:     '📖',
  practice: '🛠️',
};

const NodeSidebar = ({ node, onClose, onMarkLearned, isLearned }) => {
  if (!node) return null;

  const resources = node.resources || {};
  const hasResources = Object.values(resources)
    .some(arr => arr && arr.length > 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
        }}
      />

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: '380px',
        background: '#ffffff',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        zIndex: 101,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #f3f4f6',
          background: '#faf5ff',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px',
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '18px',
              fontWeight: '700',
              color: '#1f2937',
              fontFamily: 'Manrope, sans-serif',
            }}>
              {node.label}
            </h3>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '0 4px',
              }}
            >
              ✕
            </button>
          </div>

          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
          }}>
            {node.level && (
              <span style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '20px',
                background: node.level === 'Beginner'
                  ? '#dcfce7' : node.level === 'Intermediate'
                  ? '#fef3c7' : '#fee2e2',
                color: node.level === 'Beginner'
                  ? '#166534' : node.level === 'Intermediate'
                  ? '#92400e' : '#991b1b',
                fontWeight: '600',
              }}>
                {node.level}
              </span>
            )}
            {node.estimated_hours && (
              <span style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '20px',
                background: '#f3f4f6',
                color: '#6b7280',
              }}>
                ~{node.estimated_hours}h to learn
              </span>
            )}
          </div>

          {node.description && (
            <p style={{
              margin: '12px 0 0',
              fontSize: '13px',
              color: '#4b5563',
              lineHeight: '1.6',
            }}>
              {node.description}
            </p>
          )}
        </div>

        {/* Resources */}
        <div style={{ padding: '24px', flex: 1 }}>
          {hasResources ? (
            Object.entries(RESOURCE_ICONS).map(([key, icon]) => {
              const items = resources[key] || [];
              if (items.length === 0) return null;

              return (
                <div key={key} style={{ marginBottom: '24px' }}>
                  <h4 style={{
                    margin: '0 0 10px',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#9ca3af',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {icon} {key === 'youtube' ? 'YouTube'
                      : key === 'courses' ? 'Free Courses'
                      : key === 'docs' ? 'Documentation'
                      : 'Practice'}
                  </h4>

                  {items.map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #f3f4f6',
                        marginBottom: '6px',
                        textDecoration: 'none',
                        transition: 'all 0.15s',
                        background: '#fafafa',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#faf5ff';
                        e.currentTarget.style.borderColor = '#ddd6fe';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#fafafa';
                        e.currentTarget.style.borderColor = '#f3f4f6';
                      }}
                    >
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#7c3aed',
                        marginBottom: '2px',
                      }}>
                        {item.title}
                      </div>
                      {(item.channel || item.platform) && (
                        <div style={{
                          fontSize: '11px',
                          color: '#9ca3af',
                        }}>
                          {item.channel || item.platform}
                          {item.free && (
                            <span style={{
                              marginLeft: '6px',
                              color: '#22c55e',
                              fontWeight: '600',
                            }}>
                              Free
                            </span>
                          )}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              );
            })
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#9ca3af',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                📚
              </div>
              <p style={{ fontSize: '13px' }}>
                Resources coming soon for this topic.
              </p>
            </div>
          )}
        </div>

        {/* Mark as Learned Button */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #f3f4f6',
        }}>
          <button
            onClick={onMarkLearned}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s',
              background: isLearned
                ? '#dcfce7'
                : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              color: isLearned ? '#166534' : '#ffffff',
            }}
          >
            {isLearned ? '✓ Marked as Learned' : 'Mark as Learned'}
          </button>
        </div>
      </div>
    </>
  );
};

export default NodeSidebar;
```

---

## Step 5 — The Main Diagram Component

```jsx
// src/components/roadmap/RoadmapDiagram.jsx

import { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import RoadmapNode from './RoadmapNode';
import NodeSidebar from './NodeSidebar';

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
          label: `Stage ${stage.number} — ${stage.title}`,
          type: 'section',
        },
        draggable: false,
      });

      yOffset += 70;

      // Skill nodes for this stage
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
    });

    return nodes;
  }, [roadmapData]);

  // Build connecting edges between nodes
  const buildEdges = useCallback(() => {
    const edges = [];

    roadmapData.stages.forEach((stage, stageIndex) => {
      // Connect stage header to first skill
      if (stage.skills.length > 0) {
        edges.push({
          id: `e-stage-${stage.id}-first`,
          source: `stage-${stage.id}`,
          target: stage.skills[0].id,
          ...defaultEdgeOptions,
        });
      }

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
        stage.skills.length > 0
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
    (acc, s) => acc + s.skills.length, 0
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
            {roadmapData.icon} {roadmapData.title}
          </h2>
          <p style={{
            margin: '4px 0 0',
            fontSize: '12px',
            color: '#7c3aed',
          }}>
            {roadmapData.stages_count} stages •
            {roadmapData.skills_count} skills •
            ~{roadmapData.estimated_time}
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
              width: `${(learnedNodes.size / totalSkills) * 100}%`,
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
```

---

## Step 6 — Update Your Roadmap Detail Page

```jsx
// src/pages/RoadmapDetail.jsx
// Add this to your existing page

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RoadmapDiagram from '../components/roadmap/RoadmapDiagram';

const RoadmapDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [view, setView] = useState('diagram'); // 'diagram' or 'list'

  useEffect(() => {
    import(`../data/roadmaps/${id}.json`)
      .then(data => setRoadmap(data.default))
      .catch(() => navigate('/roadmap'));
  }, [id]);

  if (!roadmap) return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh',
      color: '#7c3aed',
    }}>
      Loading roadmap...
    </div>
  );

  return (
    <div>
      {/* Back + View Toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid #f3f4f6',
        background: '#ffffff',
      }}>
        <button
          onClick={() => navigate('/roadmap')}
          style={{
            background: 'none',
            border: 'none',
            color: '#7c3aed',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ← Back to Roadmaps
        </button>

        {/* Toggle between diagram and list view */}
        <div style={{
          display: 'flex',
          background: '#f3f4f6',
          borderRadius: '8px',
          padding: '3px',
          gap: '2px',
        }}>
          {[
            { key: 'diagram', label: '🗺️ Diagram' },
            { key: 'list',    label: '📋 List' },
          ].map(btn => (
            <button
              key={btn.key}
              onClick={() => setView(btn.key)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.15s',
                background: view === btn.key ? '#ffffff' : 'transparent',
                color: view === btn.key ? '#7c3aed' : '#6b7280',
                boxShadow: view === btn.key
                  ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diagram or List View */}
      {view === 'diagram' ? (
        <RoadmapDiagram roadmapData={roadmap} />
      ) : (
        // Your existing StageAccordion list view here
        <div style={{ padding: '24px' }}>
          {/* existing accordion components */}
        </div>
      )}
    </div>
  );
};

export default RoadmapDetail;
```

---

## Step 7 — The CSS File

```css
/* src/components/roadmap/roadmapDiagram.css */

/* Override React Flow defaults for light theme */
.react-flow__attribution {
  display: none;
}

.react-flow__controls-button {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #374151;
}

.react-flow__controls-button:hover {
  background: #faf5ff;
}

.react-flow__minimap-mask {
  fill: rgba(124, 58, 237, 0.05);
}

.react-flow__edge-path {
  stroke: #c4b5fd;
  stroke-width: 1.5;
}

.react-flow__edge.selected .react-flow__edge-path {
  stroke: #7c3aed;
  stroke-width: 2;
}
```

---

## Step 8 — Import CSS in Main

```jsx
// src/main.jsx or src/App.jsx

import 'reactflow/dist/style.css';
import './components/roadmap/roadmapDiagram.css';
```

---

## What It Looks Like

```
┌─────────────────────────────────────────────┐
│ ⚛️ Frontend Developer          5/12 ████░░ │
│ 4 stages • 12 skills • ~6 months           │
├─────────────────────────────────────────────┤
│ LEGEND: [Stage] [Skill] [Advanced] [Optional]│
│                          💡 Click to learn  │
├─────────────────────────────────────────────┤
│                                             │
│           ┌──────────────────┐              │
│           │ Stage 1 — Found. │              │
│           └────────┬─────────┘              │
│                    │                        │
│         ┌──────────┴──────────┐             │
│         ▼                     ▼             │
│  ┌─────────────┐    ┌─────────────────┐     │
│  │ HTML & CSS  │    │   JavaScript    │     │
│  └──────┬──────┘    └────────┬────────┘     │
│         │                    │              │
│         └──────────┬─────────┘              │
│                    ▼                        │
│           ┌──────────────────┐              │
│           │ Responsive Design│              │
│           └──────────────────┘              │
│                                             │
│           ┌──────────────────┐              │
│           │ Stage 2 — Core   │              │
│           └──────────────────┘              │
│                   ...                       │
│                                   [MiniMap] │
│                         [Zoom] [Fit] [Lock] │
└─────────────────────────────────────────────┘
```

---

## What Happens When You Click a Node

```
Click "JavaScript" node →
Right sidebar slides in →

┌─────────────────────────────┐
│ JavaScript           ✕      │
│ Intermediate • ~60h         │
│                             │
│ Core programming language   │
│ of the web...               │
│                             │
│ 📺 YOUTUBE                  │
│ ┌──────────────────────┐    │
│ │ JavaScript Full Course│   │
│ │ freeCodeCamp         │    │
│ └──────────────────────┘    │
│ ┌──────────────────────┐    │
│ │ JS in 100 Seconds    │    │
│ │ Fireship             │    │
│ └──────────────────────┘    │
│                             │
│ 📚 FREE COURSES             │
│ ┌──────────────────────┐    │
│ │ javascript.info      │    │
│ │ javascript.info Free │    │
│ └──────────────────────┘    │
│                             │
│ ┌─────────────────────────┐ │
│ │   Mark as Learned ✓    │  │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

---

## Key Features Summary

```
✅ Exactly like roadmap.sh visually
✅ Light theme with Invikt purple
✅ Clickable nodes → resource sidebar
✅ Zoom in/out, pan, fit view
✅ Minimap bottom right corner
✅ Progress bar at top
✅ Mark as learned per skill
✅ Toggle between diagram and list view
✅ Smooth connecting lines
✅ Dotted lines between stages
✅ Color coded by difficulty
✅ Hover animations on nodes
✅ Responsive and smooth
```

---

## Total npm Packages Needed

```bash
npm install reactflow
```

That is the only package needed.
React Flow includes everything:
nodes, edges, minimap, controls,
zoom, pan — all built in.

---

## Cost

```
React Flow: FREE (MIT license)
No API calls: FREE
No backend needed: FREE

Total extra cost: $0
```

---

> Start with Step 1 — install reactflow.
> Then create the 3 component files.
> Update your RoadmapDetail page.
> Your diagram will be live immediately.
