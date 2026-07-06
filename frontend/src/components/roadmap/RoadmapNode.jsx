import { Handle, Position } from '@xyflow/react';

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
