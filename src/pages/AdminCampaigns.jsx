import { useState } from 'react';
import { Plus, Edit3, Archive, Eye, X, Search, Filter } from 'lucide-react';
import { campaigns, verticals } from '../data/mockData';
import NGOBadge from '../components/NGOBadge';

const T = {
  green:        '#1A4D2E',
  greenLight:   '#2E7D32',
  greenPale:    '#E8F5EE',
  amber:        '#D4891A',
  amberPale:    '#FDF3E7',
  blue:         '#1976D2',
  bluePale:     '#E3F0FB',
  white:        '#FFFFFF',
  surface:      '#F5F7F2',
  border:       '#E8EDE5',
  textPrimary:  '#1A1A1A',
  textSecondary:'#4A6358',
  textMuted:    '#8FA99C',
  shadow:       '0 2px 16px rgba(26,77,46,0.07)',
  shadowMd:     '0 8px 32px rgba(26,77,46,0.11)',
  radius:       '16px',
  radiusSm:     '10px',
};

const statusConfig = {
  active:    { bg: '#E8F5EE', color: '#1A4D2E', border: '#C0DEC9', label: 'Active'    },
  upcoming:  { bg: '#E3F0FB', color: '#1565C0', border: '#B3D0F0', label: 'Upcoming'  },
  completed: { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB', label: 'Completed' },
  draft:     { bg: '#FDF3E7', color: '#D4891A', border: '#F0D9B5', label: 'Draft'     },
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radius, boxShadow: T.shadow, ...style }}>
    {children}
  </div>
);

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  border: `1.5px solid ${T.border}`, borderRadius: 10,
  padding: '10px 14px', fontSize: 13, color: T.textPrimary,
  background: T.white, outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: "'DM Sans', system-ui, sans-serif",
};

const labelStyle = {
  display: 'block', fontSize: 12, fontWeight: 600,
  color: T.textPrimary, marginBottom: 5,
};

export default function AdminCampaigns() {
  const [showForm, setShowForm]   = useState(false);
  const [search, setSearch]       = useState('');
  const [filterStatus, setFilter] = useState('all');

  const filtered = campaigns.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ minHeight: '100vh', paddingTop: "5rem", paddingBottom: "5rem", paddingLeft: 0, marginLeft: 240, background: T.surface, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem,4vw,2.25rem)', fontWeight: 700, color: T.textPrimary, letterSpacing: '-0.02em', marginBottom: 4 }}>
              Campaign Management
            </h1>
            <p style={{ fontSize: 14, color: T.textMuted }}>Create, edit, and manage campaigns across all verticals.</p>
          </div>
          <button
            onClick={() => setShowForm(f => !f)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '10px 20px', borderRadius: 11,
              background: showForm ? T.surface : `linear-gradient(135deg, ${T.green}, ${T.greenLight})`,
              color: showForm ? T.textSecondary : '#fff',
              border: showForm ? `1.5px solid ${T.border}` : 'none',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: showForm ? 'none' : '0 4px 14px rgba(26,77,46,0.3)',
              transition: 'all 0.2s',
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}
            onMouseEnter={e => { if (!showForm) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(26,77,46,0.4)'; } }}
            onMouseLeave={e => { if (!showForm) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,77,46,0.3)'; } }}
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? 'Cancel' : 'New Campaign'}
          </button>
        </div>

        {/* ── Create Form ── */}
        {showForm && (
          <Card style={{ padding: '2rem', animation: 'slideDown 0.22s cubic-bezier(0.4,0,0.2,1)' }}>
            {/* Form header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `1px solid ${T.border}` }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.1rem', fontWeight: 700, color: T.textPrimary, margin: 0 }}>
                  Create New Campaign
                </h3>
                <p style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>Fill in the details to publish a new volunteer drive.</p>
              </div>
              <button onClick={() => setShowForm(false)} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: T.white, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: T.textMuted }}>
                <X size={15} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* Title - full width */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Campaign Title</label>
                <input type="text" placeholder="e.g. Mumbai Food Drive 2025" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = T.green}
                  onBlur={e  => e.target.style.borderColor = T.border} />
              </div>
              <div>
                <label style={labelStyle}>NGO Vertical</label>
                <select style={inputStyle}
                  onFocus={e => e.target.style.borderColor = T.green}
                  onBlur={e  => e.target.style.borderColor = T.border}>
                  <option value="">Select vertical...</option>
                  {verticals.map(v => <option key={v.id} value={v.id}>{v.icon} {v.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Location / Venue</label>
                <input type="text" placeholder="City, Venue" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = T.green}
                  onBlur={e  => e.target.style.borderColor = T.border} />
              </div>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input type="date" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = T.green}
                  onBlur={e  => e.target.style.borderColor = T.border} />
              </div>
              <div>
                <label style={labelStyle}>End Date</label>
                <input type="date" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = T.green}
                  onBlur={e  => e.target.style.borderColor = T.border} />
              </div>
              <div>
                <label style={labelStyle}>Max Volunteers</label>
                <input type="number" placeholder="50" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = T.green}
                  onBlur={e  => e.target.style.borderColor = T.border} />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select style={inputStyle}
                  onFocus={e => e.target.style.borderColor = T.green}
                  onBlur={e  => e.target.style.borderColor = T.border}>
                  <option>Draft</option>
                  <option>Upcoming</option>
                  <option>Active</option>
                </select>
              </div>
              {/* Description - full width */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Description</label>
                <textarea rows={3} placeholder="Describe the campaign goals, activities, and requirements..."
                  style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = T.green}
                  onBlur={e  => e.target.style.borderColor = T.border} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: '1.25rem' }}>
              <button onClick={() => setShowForm(false)} style={{
                padding: '9px 20px', borderRadius: 10, border: `1.5px solid ${T.border}`,
                background: T.white, color: T.textSecondary, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif",
              }}>
                Cancel
              </button>
              <button style={{
                padding: '9px 22px', borderRadius: 10, border: 'none',
                background: `linear-gradient(135deg, ${T.green}, ${T.greenLight})`,
                color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(26,77,46,0.3)',
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}>
                Create Campaign
              </button>
            </div>
          </Card>
        )}

        {/* ── Search + Filter Bar ── */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.textMuted }} />
            <input
              type="text" placeholder="Search by title or city..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 36, background: T.white }}
              onFocus={e => e.target.style.borderColor = T.green}
              onBlur={e  => e.target.style.borderColor = T.border}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['all', 'active', 'upcoming', 'completed', 'draft'].map(s => {
              const active = filterStatus === s;
              return (
                <button key={s} onClick={() => setFilter(s)} style={{
                  padding: '8px 14px', borderRadius: 9,
                  border: active ? `1.5px solid ${T.green}` : `1.5px solid ${T.border}`,
                  background: active ? T.greenPale : T.white,
                  color: active ? T.green : T.textMuted,
                  fontSize: 12, fontWeight: active ? 700 : 500,
                  cursor: 'pointer', textTransform: 'capitalize',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  transition: 'all 0.15s',
                }}>
                  {s === 'all' ? 'All' : s}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Campaigns Table ── */}
        <Card>
          <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: T.textSecondary }}>
              <span style={{ fontWeight: 800, color: T.textPrimary }}>{filtered.length}</span> campaigns
            </p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#FAFBF9' }}>
                  {['Campaign', 'Vertical', 'City', 'Date', 'Volunteers', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{
                      textAlign: 'left', padding: '11px 18px',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                      textTransform: 'uppercase', color: T.textMuted,
                      borderBottom: `1px solid ${T.border}`, whiteSpace: 'nowrap',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, idx) => {
                  const pct = Math.round((c.enrolledCount / c.maxVolunteers) * 100);
                  const cfg = statusConfig[c.status] || statusConfig.draft;
                  return (
                    <tr key={c.id} style={{
                      borderBottom: idx < filtered.length - 1 ? `1px solid ${T.border}` : 'none',
                      transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = T.greenPale}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '13px 18px', maxWidth: 200 }}>
                        <p style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {c.title}
                        </p>
                      </td>
                      <td style={{ padding: '13px 18px' }}>
                        <NGOBadge verticalId={c.verticalId} size="xs" />
                      </td>
                      <td style={{ padding: '13px 18px', fontSize: 13, color: T.textSecondary }}>{c.city}</td>
                      <td style={{ padding: '13px 18px', fontSize: 12, color: T.textMuted, whiteSpace: 'nowrap' }}>
                        {new Date(c.dateStart).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td style={{ padding: '13px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 60, height: 5, background: '#EEF2EF', borderRadius: 99, overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', borderRadius: 99,
                              width: `${pct}%`,
                              background: pct >= 80 ? '#D4891A' : T.green,
                            }} />
                          </div>
                          <span style={{ fontSize: 11, color: T.textMuted, whiteSpace: 'nowrap' }}>
                            {c.enrolledCount}/{c.maxVolunteers}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '13px 18px' }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, padding: '4px 11px', borderRadius: 20,
                          background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                          textTransform: 'capitalize',
                        }}>
                          {cfg.label}
                        </span>
                      </td>
                      <td style={{ padding: '13px 18px' }}>
                        <div style={{ display: 'flex', gap: 3 }}>
                          {[
                            { icon: <Eye size={14} />,     hoverColor: T.green, hoverBg: T.greenPale },
                            { icon: <Edit3 size={14} />,   hoverColor: T.amber, hoverBg: T.amberPale },
                            { icon: <Archive size={14} />, hoverColor: '#B91C1C', hoverBg: '#FEF2F2' },
                          ].map((btn, i) => (
                            <button key={i} style={{
                              width: 30, height: 30, borderRadius: 8, border: 'none',
                              background: 'transparent', color: T.textMuted,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              cursor: 'pointer', transition: 'all 0.15s',
                            }}
                              onMouseEnter={e => { e.currentTarget.style.background = btn.hoverBg; e.currentTarget.style.color = btn.hoverColor; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.textMuted; }}
                            >
                              {btn.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: T.textMuted, fontSize: 14 }}>
                      No campaigns match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}