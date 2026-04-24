import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Award, TrendingUp, CheckCircle, Flame } from 'lucide-react';
import { volunteerProfile } from '../data/mockData';
import { NGOBadgeByName } from '../components/NGOBadge';

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

const Card = ({ children, style = {} }) => (
  <div style={{
    background: T.white, border: `1px solid ${T.border}`,
    borderRadius: T.radius, boxShadow: T.shadow, ...style,
  }}>
    {children}
  </div>
);

const statusConfig = {
  active:    { bg: T.greenPale, color: T.green,   border: '#C0DEC9', dot: '#22C55E', label: 'Active'    },
  completed: { bg: '#F3F4F6',   color: '#6B7280', border: '#E5E7EB', dot: '#9CA3AF', label: 'Completed' },
  upcoming:  { bg: T.bluePale,  color: T.blue,    border: '#B3D0F0', dot: '#60A5FA', label: 'Upcoming'  },
};

export default function MyCampaigns() {
  const enrolled   = volunteerProfile.enrolledCampaigns;
  const totalHours = enrolled.reduce((a, c) => a + c.hoursLogged, 0);
  const active     = enrolled.filter(c => c.status === 'active').length;
  const certs      = 3;

  const summaryCards = [
    { icon: <Flame size={20} />,     value: active,      label: 'Active Campaigns', color: T.green,  bg: T.greenPale, border: '#C0DEC9' },
    { icon: <Clock size={20} />,     value: `${totalHours}h`, label: 'Hours Logged',    color: T.amber,  bg: T.amberPale, border: '#F0D9B5' },
    { icon: <Award size={20} />,     value: certs,       label: 'Certificates',     color: T.blue,   bg: T.bluePale,  border: '#B3D0F0' },
    { icon: <TrendingUp size={20} />,value: enrolled.length, label: 'Total Campaigns',  color: '#7C3AED', bg: '#F3F0FF', border: '#C4B5FD' },
  ];

  return (
    <div style={{
      minHeight: '100vh', paddingTop: '6rem', paddingBottom: '5rem',
      background: T.surface, fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 clamp(1rem,5vw,2.5rem)', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

        {/* ── Page Header ── */}
        <div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.75rem,4vw,2.25rem)', fontWeight: 700,
            color: T.textPrimary, letterSpacing: '-0.02em', marginBottom: 6,
          }}>
            My Campaigns
          </h1>
          <p style={{ fontSize: 14, color: T.textMuted }}>
            Track your enrolled campaigns and volunteer hours.
          </p>
        </div>

        {/* ── Summary Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
          {summaryCards.map((s, i) => (
            <Card key={i} style={{ padding: '1.1rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: s.color, borderRadius: `${T.radius} ${T.radius} 0 0` }} />
              <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, border: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, marginBottom: 10 }}>
                {s.icon}
              </div>
              <p style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color, lineHeight: 1, letterSpacing: '-0.02em', fontFamily: "'Playfair Display', serif" }}>
                {s.value}
              </p>
              <p style={{ fontSize: 11, color: T.textMuted, marginTop: 4, fontWeight: 600 }}>{s.label}</p>
            </Card>
          ))}
        </div>

        {/* ── Campaigns List ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', fontWeight: 700, color: T.textPrimary }}>
              Enrolled Campaigns
            </h2>
            <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 500 }}>{enrolled.length} total</span>
          </div>

          {enrolled.map((c, i) => {
            const cfg = statusConfig[c.status] || statusConfig.completed;
            const pct = Math.min(Math.round((c.hoursLogged / 20) * 100), 100); // progress out of ~20hrs

            return (
              <Card key={c.campaignId} style={{
                padding: '1.5rem',
                animation: `fadeUp 0.35s cubic-bezier(0.4,0,0.2,1) ${i * 0.07}s both`,
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = T.shadowMd; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = T.shadow; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>

                  {/* Left: info */}
                  <div style={{ flex: 1, minWidth: 220 }}>
                    {/* Badges row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                      <NGOBadgeByName name={c.vertical} size="xs" />
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                        background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                        textTransform: 'capitalize',
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
                        {cfg.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.05rem', fontWeight: 700,
                      color: T.textPrimary, marginBottom: 10, lineHeight: 1.3,
                    }}>
                      {c.title}
                    </h3>

                    {/* Hours + progress */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <Clock size={13} color={T.textMuted} />
                      <span style={{ fontSize: 12, color: T.textMuted }}>{c.hoursLogged}h logged</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1, height: 5, background: '#EEF2EF', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: 99, width: `${pct}%`,
                          background: `linear-gradient(90deg, ${T.green}, ${T.greenLight})`,
                          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                        }} />
                      </div>
                      <span style={{ fontSize: 11, color: T.textMuted, whiteSpace: 'nowrap' }}>{pct}%</span>
                    </div>
                  </div>

                  {/* Right: hours badge + arrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                    <div style={{
                      textAlign: 'center', padding: '10px 16px',
                      background: T.greenPale, borderRadius: 12,
                      border: `1px solid #C0DEC9`,
                    }}>
                      <p style={{ fontSize: '1.4rem', fontWeight: 800, color: T.green, lineHeight: 1, fontFamily: "'Playfair Display', serif" }}>
                        {c.hoursLogged}h
                      </p>
                      <p style={{ fontSize: 10, color: T.textMuted, marginTop: 3, fontWeight: 600 }}>Logged</p>
                    </div>
                    <Link to={`/campaigns/${c.campaignId}`} style={{
                      width: 40, height: 40, borderRadius: 11,
                      background: T.greenPale, border: `1px solid #C0DEC9`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: T.green, textDecoration: 'none', transition: 'all 0.18s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = T.green; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = T.green; }}
                      onMouseLeave={e => { e.currentTarget.style.background = T.greenPale; e.currentTarget.style.color = T.green; e.currentTarget.style.borderColor = '#C0DEC9'; }}
                    >
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>

                {/* Completed checkmark banner */}
                {c.status === 'completed' && (
                  <div style={{
                    marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}`,
                    display: 'flex', alignItems: 'center', gap: 7,
                  }}>
                    <CheckCircle size={14} color={T.green} />
                    <span style={{ fontSize: 12, color: T.textSecondary, fontWeight: 500 }}>
                      Campaign completed — certificate available
                    </span>
                    <span style={{
                      marginLeft: 'auto', fontSize: 11, fontWeight: 700,
                      padding: '3px 10px', borderRadius: 20,
                      background: T.amberPale, color: T.amber, border: `1px solid #F0D9B5`,
                    }}>
                      Download Certificate
                    </span>
                  </div>
                )}
              </Card>
            );
          })}

          {enrolled.length === 0 && (
            <Card style={{ padding: '3rem', textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌱</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: T.textPrimary, marginBottom: 6 }}>No campaigns yet</p>
              <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 20 }}>Browse and join a campaign to get started.</p>
              <Link to="/campaigns" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 22px',
                borderRadius: 10, background: T.green, color: '#fff',
                textDecoration: 'none', fontSize: 13, fontWeight: 700,
              }}>
                Browse Campaigns <ArrowRight size={14} />
              </Link>
            </Card>
          )}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @media (max-width: 640px) {
          .summary-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}