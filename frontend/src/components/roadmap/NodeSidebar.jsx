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
