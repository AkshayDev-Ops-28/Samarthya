import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, MapPin } from 'lucide-react';
import { campaigns, verticals } from '../data/mockData';
import CampaignCard from '../components/CampaignCard';

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
  shadowMd:     '0 8px 32px rgba(26,77,46,0.12)',
  radius:       '16px',
  radiusSm:     '10px',
};

const inputBase = {
  width: '100%', boxSizing: 'border-box',
  border: `1.5px solid ${T.border}`, borderRadius: 12,
  padding: '11px 16px', fontSize: 14, color: T.textPrimary,
  background: T.white, outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: "'DM Sans', system-ui, sans-serif",
  appearance: 'none',
};

const labelStyle = {
  display: 'block', fontSize: 10, fontWeight: 700,
  letterSpacing: '0.07em', textTransform: 'uppercase',
  color: T.textMuted, marginBottom: 7,
};

const statusConfig = {
  active:    { bg: T.greenPale, color: T.green,   border: '#C0DEC9' },
  upcoming:  { bg: '#E3F0FB',   color: '#1565C0', border: '#B3D0F0' },
  completed: { bg: '#F3F4F6',   color: '#6B7280', border: '#E5E7EB' },
};

export default function Campaigns() {
  const [search, setSearch]               = useState('');
  const [verticalFilter, setVerticalFilter] = useState('all');
  const [statusFilter, setStatusFilter]   = useState('all');
  const [cityFilter, setCityFilter]       = useState('all');
  const [showFilters, setShowFilters]     = useState(false);

  const cities = [...new Set(campaigns.map(c => c.city))].sort();

  const filtered = useMemo(() => campaigns.filter(c => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (verticalFilter !== 'all' && c.verticalId !== parseInt(verticalFilter)) return false;
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (cityFilter !== 'all' && c.city !== cityFilter) return false;
    return true;
  }), [search, verticalFilter, statusFilter, cityFilter]);

  const activeFilters = [verticalFilter !== 'all', statusFilter !== 'all', cityFilter !== 'all'].filter(Boolean).length;

  const clearFilters = () => {
    setSearch(''); setVerticalFilter('all'); setStatusFilter('all'); setCityFilter('all');
  };

  const focusInput  = e => { e.target.style.borderColor = T.green; e.target.style.boxShadow = `0 0 0 3px rgba(26,77,46,0.08)`; };
  const blurInput   = e => { e.target.style.borderColor = T.border; e.target.style.boxShadow = 'none'; };

  const activePills = [
    verticalFilter !== 'all' && { label: verticals.find(v => v.id === parseInt(verticalFilter))?.name, onRemove: () => setVerticalFilter('all'), bg: T.greenPale, color: T.green, border: '#C0DEC9' },
    statusFilter   !== 'all' && { label: statusFilter,  onRemove: () => setStatusFilter('all'),   bg: '#E3F0FB', color: '#1565C0', border: '#B3D0F0' },
    cityFilter     !== 'all' && { label: cityFilter,    onRemove: () => setCityFilter('all'),     bg: T.amberPale, color: T.amber, border: '#F0D9B5' },
  ].filter(Boolean);

  return (
    <div style={{
      minHeight: '100vh', paddingTop: '6rem', paddingBottom: '5rem',
      background: T.surface, fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1rem,5vw,2.5rem)' }}>

        {/* ── Hero Header ── */}
        <div style={{ marginBottom: '3rem' }}>
          {/* Discover pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 20, marginBottom: 16,
            background: T.amberPale, border: `1px solid ${T.amber}25`,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: T.amber,
          }}>
            ✦ Discover
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700,
            color: T.textPrimary, letterSpacing: '-0.025em',
            lineHeight: 1.1, marginBottom: 12,
          }}>
            All Campaigns
          </h1>
          <p style={{ fontSize: 16, color: T.textMuted, lineHeight: 1.6, maxWidth: 480 }}>
            Find the perfect campaign to make your impact across India's most pressing causes.
          </p>

          {/* Quick stats strip */}
          <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
            {[
              { value: campaigns.length, label: 'Total Campaigns' },
              { value: campaigns.filter(c => c.status === 'active').length, label: 'Active Now' },
              { value: cities.length, label: 'Cities' },
              { value: verticals.length, label: 'Verticals' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 800, color: T.green, fontFamily: "'Playfair Display', serif" }}>{s.value}</span>
                <span style={{ fontSize: 12, color: T.textMuted }}>{s.label}</span>
                {i < 3 && <span style={{ fontSize: 12, color: T.border, marginLeft: 4 }}>·</span>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Search + Filter Bar ── */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>

          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: T.textMuted, pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search campaigns by name or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputBase, paddingLeft: 42, paddingRight: search ? 38 : 16 }}
              onFocus={focusInput} onBlur={blurInput}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted,
                display: 'flex', alignItems: 'center', padding: 2,
              }}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(f => !f)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 20px', borderRadius: 12, cursor: 'pointer',
              border: showFilters || activeFilters > 0
                ? `1.5px solid ${T.green}`
                : `1.5px solid ${T.border}`,
              background: showFilters || activeFilters > 0
                ? `linear-gradient(135deg, ${T.green}, ${T.greenLight})`
                : T.white,
              color: showFilters || activeFilters > 0 ? '#fff' : T.textSecondary,
              fontSize: 13, fontWeight: 700, transition: 'all 0.2s',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              boxShadow: showFilters || activeFilters > 0
                ? '0 4px 14px rgba(26,77,46,0.3)'
                : T.shadow,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (!showFilters && !activeFilters) { e.currentTarget.style.borderColor = T.green; e.currentTarget.style.background = T.greenPale; e.currentTarget.style.color = T.green; } }}
            onMouseLeave={e => { if (!showFilters && !activeFilters) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.white; e.currentTarget.style.color = T.textSecondary; } }}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilters > 0 && (
              <span style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800,
              }}>
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {/* ── Filter Panel ── */}
        {showFilters && (
          <div style={{
            background: T.white, border: `1px solid ${T.border}`,
            borderRadius: T.radius, padding: '1.5rem',
            marginBottom: '1.25rem', boxShadow: T.shadowMd,
            animation: 'slideDown 0.2s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {/* Panel header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: `1px solid ${T.border}` }}>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: T.textPrimary, margin: 0 }}>Filter Campaigns</h3>
                <p style={{ fontSize: 11, color: T.textMuted, marginTop: 3 }}>Narrow down by vertical, status, or city</p>
              </div>
              {activeFilters > 0 && (
                <button onClick={clearFilters} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 12px', borderRadius: 8,
                  background: '#FEF2F2', border: '1px solid #FECACA',
                  color: '#B91C1C', fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif",
                }}>
                  <X size={11} /> Clear all
                </button>
              )}
            </div>

            {/* Filter dropdowns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
              {[
                {
                  label: 'NGO Vertical', value: verticalFilter, onChange: e => setVerticalFilter(e.target.value),
                  options: [{ value: 'all', label: 'All Verticals' }, ...verticals.map(v => ({ value: v.id, label: `${v.icon} ${v.name}` }))],
                },
                {
                  label: 'Status', value: statusFilter, onChange: e => setStatusFilter(e.target.value),
                  options: [{ value: 'all', label: 'All Statuses' }, { value: 'active', label: '🟢 Active' }, { value: 'upcoming', label: '🔵 Upcoming' }, { value: 'completed', label: '⚪ Completed' }],
                },
                {
                  label: 'City', value: cityFilter, onChange: e => setCityFilter(e.target.value),
                  options: [{ value: 'all', label: 'All Cities' }, ...cities.map(c => ({ value: c, label: c }))],
                },
              ].map((f, i) => (
                <div key={i}>
                  <label style={labelStyle}>{f.label}</label>
                  <div style={{ position: 'relative' }}>
                    <select value={f.value} onChange={f.onChange}
                      style={{ ...inputBase, paddingRight: 36, cursor: 'pointer' }}
                      onFocus={focusInput} onBlur={blurInput}
                    >
                      {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <ChevronDown size={13} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: T.textMuted, pointerEvents: 'none' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Active filter pills */}
            {activePills.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${T.border}` }}>
                {activePills.map((pill, i) => (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 11px', borderRadius: 20,
                    background: pill.bg, color: pill.color, border: `1px solid ${pill.border}`,
                    fontSize: 11, fontWeight: 700, textTransform: 'capitalize',
                  }}>
                    {pill.label}
                    <button onClick={pill.onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', padding: 0 }}>
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Results bar ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 13, color: T.textMuted }}>
            Showing{' '}
            <span style={{ fontWeight: 700, color: T.textPrimary }}>{filtered.length}</span>
            {' '}campaign{filtered.length !== 1 ? 's' : ''}
            {activeFilters > 0 && <span style={{ color: T.textMuted }}> · filtered</span>}
          </p>

          {/* Status quick-filter pills */}
          <div style={{ display: 'flex', gap: 6 }}>
            {['all', 'active', 'upcoming', 'completed'].map(s => {
              const active = statusFilter === s;
              const cfg = statusConfig[s];
              return (
                <button key={s} onClick={() => setStatusFilter(s)} style={{
                  padding: '5px 13px', borderRadius: 20,
                  border: active
                    ? `1.5px solid ${s === 'all' ? T.green : cfg.color}`
                    : `1.5px solid ${T.border}`,
                  background: active
                    ? (s === 'all' ? T.greenPale : cfg.bg)
                    : T.white,
                  color: active
                    ? (s === 'all' ? T.green : cfg.color)
                    : T.textMuted,
                  fontSize: 11, fontWeight: active ? 700 : 500,
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

        {/* ── Campaign Grid / Empty ── */}
        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '5rem 2rem',
            background: T.white, borderRadius: T.radius,
            border: `1px solid ${T.border}`, boxShadow: T.shadow,
          }}>
            <p style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</p>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.25rem', fontWeight: 700, color: T.textPrimary, marginBottom: 8 }}>
              No campaigns found
            </h3>
            <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button onClick={clearFilters} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '11px 24px', borderRadius: 11, border: 'none',
              background: `linear-gradient(135deg, ${T.green}, ${T.greenLight})`,
              color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(26,77,46,0.3)',
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}>
              <X size={14} /> Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((c, i) => (
              <CampaignCard key={c.id} campaign={c} index={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @media (max-width: 640px) {
          .filter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}