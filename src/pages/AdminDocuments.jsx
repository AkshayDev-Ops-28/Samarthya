import { useState } from 'react';
import { FileText, CheckCircle, XCircle, Clock, Eye, Download, Search, Filter, Shield } from 'lucide-react';

// ── Mock documents data (replace with real data from mockData if available) ──
const mockDocuments = [
  { id: 1, volunteerName: 'Priya Sharma',    email: 'priya@gmail.com',    docType: 'Aadhar Card',  uploadedAt: '2025-06-01', status: 'pending',  city: 'Mumbai'    },
  { id: 2, volunteerName: 'Arjun Mehta',     email: 'arjun@gmail.com',    docType: 'College ID',   uploadedAt: '2025-05-28', status: 'approved', city: 'Delhi'     },
  { id: 3, volunteerName: 'Sneha Patil',     email: 'sneha@gmail.com',    docType: 'Certificate',  uploadedAt: '2025-05-25', status: 'rejected', city: 'Pune'      },
  { id: 4, volunteerName: 'Rahul Desai',     email: 'rahul@gmail.com',    docType: 'Aadhar Card',  uploadedAt: '2025-06-02', status: 'pending',  city: 'Bengaluru' },
  { id: 5, volunteerName: 'Kavya Nair',      email: 'kavya@gmail.com',    docType: 'College ID',   uploadedAt: '2025-05-20', status: 'approved', city: 'Chennai'   },
  { id: 6, volunteerName: 'Rohit Joshi',     email: 'rohit@gmail.com',    docType: 'Certificate',  uploadedAt: '2025-06-03', status: 'pending',  city: 'Hyderabad' },
  { id: 7, volunteerName: 'Ananya Singh',    email: 'ananya@gmail.com',   docType: 'Aadhar Card',  uploadedAt: '2025-05-15', status: 'approved', city: 'Kolkata'   },
  { id: 8, volunteerName: 'Vikram Tiwari',   email: 'vikram@gmail.com',   docType: 'College ID',   uploadedAt: '2025-06-04', status: 'pending',  city: 'Jaipur'    },
];

const T = {
  green:        '#1A4D2E',
  greenLight:   '#2E7D32',
  greenPale:    '#E8F5EE',
  amber:        '#D4891A',
  amberPale:    '#FDF3E7',
  white:        '#FFFFFF',
  surface:      '#F5F7F2',
  border:       '#E8EDE5',
  textPrimary:  '#1A1A1A',
  textSecondary:'#4A6358',
  textMuted:    '#8FA99C',
  shadow:       '0 2px 16px rgba(26,77,46,0.07)',
  radius:       '16px',
  radiusSm:     '10px',
};

const statusConfig = {
  pending:  { bg: T.amberPale, color: T.amber,   border: '#F0D9B5', icon: <Clock size={12} />,       label: 'Pending'  },
  approved: { bg: T.greenPale, color: T.green,   border: '#C0DEC9', icon: <CheckCircle size={12} />, label: 'Approved' },
  rejected: { bg: '#FEF2F2',   color: '#B91C1C', border: '#FECACA', icon: <XCircle size={12} />,     label: 'Rejected' },
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: T.radius, boxShadow: T.shadow, ...style }}>
    {children}
  </div>
);

const StatPill = ({ value, label, color, bg }) => (
  <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: bg, border: `1px solid ${color}25`, textAlign: 'center', minWidth: 90 }}>
    <p style={{ fontSize: '1.4rem', fontWeight: 800, color, lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>{value}</p>
    <p style={{ fontSize: 11, color: T.textMuted, marginTop: 4, fontWeight: 600 }}>{label}</p>
  </div>
);

export default function AdminDocuments() {
  const [docs, setDocs]           = useState(mockDocuments);
  const [search, setSearch]       = useState('');
  const [filterStatus, setFilter] = useState('all');
  const [previewId, setPreviewId] = useState(null);

  const filtered = docs.filter(d => {
    const matchSearch = d.volunteerName.toLowerCase().includes(search.toLowerCase()) ||
                        d.docType.toLowerCase().includes(search.toLowerCase()) ||
                        d.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id, status) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, status } : d));
  };

  const counts = {
    total:    docs.length,
    pending:  docs.filter(d => d.status === 'pending').length,
    approved: docs.filter(d => d.status === 'approved').length,
    rejected: docs.filter(d => d.status === 'rejected').length,
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    border: `1.5px solid ${T.border}`, borderRadius: 10,
    padding: '10px 14px', fontSize: 13, color: T.textPrimary,
    background: T.white, outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: "5rem", paddingBottom: "5rem", paddingLeft: 0, marginLeft: 240, background: T.surface, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(1rem,4vw,2.5rem)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* ── Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.75rem,4vw,2.25rem)', fontWeight: 700, color: T.textPrimary, letterSpacing: '-0.02em', marginBottom: 4 }}>
              Document Verification
            </h1>
            <p style={{ fontSize: 14, color: T.textMuted }}>Review and approve volunteer identity documents.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 20, background: counts.pending > 0 ? T.amberPale : T.greenPale, border: `1px solid ${counts.pending > 0 ? '#F0D9B5' : '#C0DEC9'}` }}>
            <Shield size={13} color={counts.pending > 0 ? T.amber : T.green} />
            <span style={{ fontSize: 12, fontWeight: 700, color: counts.pending > 0 ? T.amber : T.green }}>
              {counts.pending > 0 ? `${counts.pending} awaiting review` : 'All clear'}
            </span>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <StatPill value={counts.total}    label="Total"    color={T.textSecondary} bg={T.surface}   />
          <StatPill value={counts.pending}  label="Pending"  color={T.amber}         bg={T.amberPale} />
          <StatPill value={counts.approved} label="Approved" color={T.green}         bg={T.greenPale} />
          <StatPill value={counts.rejected} label="Rejected" color="#B91C1C"         bg="#FEF2F2"     />
        </div>

        {/* ── Search + Filter ── */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: T.textMuted }} />
            <input
              type="text" placeholder="Search volunteer, document type, city..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 36 }}
              onFocus={e => e.target.style.borderColor = T.green}
              onBlur={e  => e.target.style.borderColor = T.border}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['all', 'pending', 'approved', 'rejected'].map(s => {
              const active = filterStatus === s;
              const cfg    = statusConfig[s];
              return (
                <button key={s} onClick={() => setFilter(s)} style={{
                  padding: '8px 14px', borderRadius: 9,
                  border:      active ? `1.5px solid ${cfg?.color || T.green}` : `1.5px solid ${T.border}`,
                  background:  active ? (cfg?.bg || T.greenPale) : T.white,
                  color:       active ? (cfg?.color || T.green)  : T.textMuted,
                  fontSize: 12, fontWeight: active ? 700 : 500,
                  cursor: 'pointer', textTransform: 'capitalize',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  transition: 'all 0.15s',
                }}>
                  {s === 'all' ? 'All Docs' : s}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Documents Table ── */}
        <Card>
          <div style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${T.border}` }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: T.textSecondary }}>
              <span style={{ fontWeight: 800, color: T.textPrimary }}>{filtered.length}</span> documents
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#FAFBF9' }}>
                  {['Volunteer', 'Document Type', 'City', 'Uploaded', 'Status', 'Actions'].map(h => (
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
                {filtered.map((doc, idx) => {
                  const cfg = statusConfig[doc.status];
                  const isPending = doc.status === 'pending';
                  return (
                    <tr key={doc.id} style={{
                      borderBottom: idx < filtered.length - 1 ? `1px solid ${T.border}` : 'none',
                      transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = T.greenPale}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      {/* Volunteer */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                            background: `linear-gradient(135deg,${T.green}18,${T.green}30)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: 700, color: T.green,
                          }}>
                            {doc.volunteerName.charAt(0)}
                          </div>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary, margin: 0 }}>{doc.volunteerName}</p>
                            <p style={{ fontSize: 11, color: T.textMuted, margin: '2px 0 0' }}>{doc.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Doc type */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 7, background: T.greenPale, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FileText size={13} color={T.green} />
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 500, color: T.textPrimary }}>{doc.docType}</span>
                        </div>
                      </td>

                      {/* City */}
                      <td style={{ padding: '14px 18px', fontSize: 13, color: T.textSecondary }}>{doc.city}</td>

                      {/* Date */}
                      <td style={{ padding: '14px 18px', fontSize: 12, color: T.textMuted, whiteSpace: 'nowrap' }}>
                        {new Date(doc.uploadedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          fontSize: 11, fontWeight: 700, padding: '4px 11px', borderRadius: 20,
                          background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                          textTransform: 'capitalize',
                        }}>
                          {cfg.icon} {cfg.label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {/* View */}
                          <button title="Preview" style={{
                            width: 30, height: 30, borderRadius: 8, border: 'none',
                            background: 'transparent', color: T.textMuted,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = T.greenPale; e.currentTarget.style.color = T.green; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.textMuted; }}
                          >
                            <Eye size={14} />
                          </button>

                          {/* Download */}
                          <button title="Download" style={{
                            width: 30, height: 30, borderRadius: 8, border: 'none',
                            background: 'transparent', color: T.textMuted,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                            onMouseEnter={e => { e.currentTarget.style.background = T.amberPale; e.currentTarget.style.color = T.amber; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.textMuted; }}
                          >
                            <Download size={14} />
                          </button>

                          {/* Approve — only if pending */}
                          {isPending && (
                            <button
                              title="Approve"
                              onClick={() => updateStatus(doc.id, 'approved')}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                padding: '5px 11px', borderRadius: 8, border: 'none',
                                background: T.greenPale, color: T.green,
                                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                transition: 'all 0.15s',
                                fontFamily: "'DM Sans', system-ui, sans-serif",
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = T.green; e.currentTarget.style.color = '#fff'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = T.greenPale; e.currentTarget.style.color = T.green; }}
                            >
                              <CheckCircle size={12} /> Approve
                            </button>
                          )}

                          {/* Reject — only if pending */}
                          {isPending && (
                            <button
                              title="Reject"
                              onClick={() => updateStatus(doc.id, 'rejected')}
                              style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                padding: '5px 11px', borderRadius: 8, border: 'none',
                                background: '#FEF2F2', color: '#B91C1C',
                                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                transition: 'all 0.15s',
                                fontFamily: "'DM Sans', system-ui, sans-serif",
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = '#B91C1C'; e.currentTarget.style.color = '#fff'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.color = '#B91C1C'; }}
                            >
                              <XCircle size={12} /> Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: T.textMuted, fontSize: 14 }}>
                      No documents match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}