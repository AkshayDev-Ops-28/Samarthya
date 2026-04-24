import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Clock, ArrowLeft, CheckCircle, User, Share2, Heart, Award, Target } from 'lucide-react';
import { campaigns, verticals } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import NGOBadge from '../components/NGOBadge';

/* ─── Design tokens (scoped so they don't bleed into global styles) ─── */
const T = {
  green:        '#1A6B4A',
  greenLight:   '#2D9B6F',
  greenPale:    '#E8F5EE',
  greenGlass:   'rgba(26,107,74,0.08)',
  amber:        '#C8762A',
  amberPale:    '#FDF3E7',
  white:        '#FFFFFF',
  surface:      '#F7F9F8',
  border:       '#E2EBE7',
  textPrimary:  '#0F2B1E',
  textSecondary:'#4A6358',
  textMuted:    '#8FA99C',
  shadow:       '0 2px 16px rgba(15,43,30,0.08)',
  shadowMd:     '0 8px 32px rgba(15,43,30,0.12)',
  shadowLg:     '0 24px 64px rgba(15,43,30,0.16)',
  radius:       '16px',
  radiusSm:     '10px',
  radiusXl:     '24px',
};

/* ─── Tiny styled primitives ─── */
const Card = ({ children, style = {}, className = '' }) => (
  <div style={{
    background: T.white,
    border: `1px solid ${T.border}`,
    borderRadius: T.radius,
    boxShadow: T.shadow,
    ...style
  }} className={className}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{
    fontSize: '1.15rem',
    fontWeight: 700,
    color: T.textPrimary,
    marginBottom: '1.25rem',
    letterSpacing: '-0.01em',
    fontFamily: 'Georgia, "Times New Roman", serif',
  }}>
    {children}
  </h2>
);

const Tag = ({ children, color }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    background: `${color}18`,
    color: color,
    border: `1px solid ${color}30`,
  }}>
    {children}
  </span>
);

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const campaign = campaigns.find(c => c.id === parseInt(id));
  if (!campaign) return (
    <div style={{ minHeight: '100vh', paddingTop: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</p>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: T.textPrimary }}>Campaign not found</h2>
        <Link to="/campaigns" style={{ color: T.green, fontWeight: 600, textDecoration: 'none' }}>Browse all campaigns</Link>
      </div>
    </div>
  );

  const vertical = verticals.find(v => v.id === campaign.verticalId);
  const accentColor = vertical?.color || T.green;
  const progress = Math.round((campaign.enrolledCount / campaign.maxVolunteers) * 100);
  const spotsLeft = campaign.maxVolunteers - campaign.enrolledCount;
  const impactPct = campaign.impact?.current
    ? Math.round((campaign.impact.current / campaign.impact.target) * 100)
    : 0;

  const handleEnroll = () => {
    if (!user) { navigate('/login'); return; }
    setShowModal(true);
  };
  const confirmEnroll = () => { setEnrolled(true); setShowModal(false); };

  return (
    <div style={{ minHeight: '100vh', background: T.surface, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── Hero ── */}
      <div style={{
        position: 'relative',
        height: '320px',
        background: `linear-gradient(160deg, ${accentColor}F0 0%, ${accentColor}CC 50%, #0a3d25 100%)`,
        overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'320px', height:'320px', borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
        <div style={{ position:'absolute', bottom:'-40px', left:'10%', width:'180px', height:'180px', borderRadius:'50%', background:'rgba(255,255,255,0.03)' }} />
        <div style={{ position:'absolute', top:'30px', left:'40%', width:'90px', height:'90px', borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />

        {/* grid texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '0 clamp(1rem,5vw,2.5rem) 2.5rem',
          maxWidth: '1200px', margin: '0 auto', width: '100%',
          left: '50%', transform: 'translateX(-50%)',
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px',
              padding: '6px 14px', fontSize: '0.8rem', cursor: 'pointer',
              marginBottom: '1.25rem', backdropFilter: 'blur(8px)',
              transition: 'all 0.2s', width: 'fit-content',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            <ArrowLeft size={14} /> Back to campaigns
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <NGOBadge verticalId={campaign.verticalId} size="md" />
            {campaign.status === 'active' && (
              <Tag color="#34D399">● Live</Tag>
            )}
          </div>
          <h1 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            fontFamily: 'Georgia, "Times New Roman", serif',
            textShadow: '0 2px 12px rgba(0,0,0,0.25)',
            maxWidth: '700px',
          }}>
            {campaign.title}
          </h1>
        </div>
      </div>

      {/* ── Page body ── */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 clamp(1rem,5vw,2.5rem)',
        marginTop: '-28px', position: 'relative', zIndex: 10,
        paddingBottom: '5rem',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: '1.75rem', alignItems: 'start' }}>

          {/* ── Left column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>

            {/* Quick stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {[
                { icon: <Calendar size={16} />, label: 'Date', value: new Date(campaign.dateStart).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) },
                { icon: <MapPin size={16} />, label: 'City', value: campaign.city },
                { icon: <Users size={16} />, label: 'Spots Left', value: spotsLeft },
                { icon: <Clock size={16} />, label: 'Status', value: campaign.status },
              ].map((item, i) => (
                <Card key={i} style={{ padding: '14px 12px', textAlign: 'center' }}>
                  <div style={{
                    width: '34px', height: '34px', borderRadius: '9px',
                    background: `${accentColor}12`, color: accentColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 8px',
                  }}>
                    {item.icon}
                  </div>
                  <p style={{ fontSize: '0.68rem', color: T.textMuted, marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{item.label}</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: T.textPrimary, textTransform: 'capitalize' }}>{item.value}</p>
                </Card>
              ))}
            </div>

            {/* About */}
            <Card style={{ padding: '2rem' }}>
              <SectionTitle>About This Campaign</SectionTitle>
              <p style={{ color: T.textSecondary, lineHeight: 1.75, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {campaign.description}
              </p>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                marginBottom: '0.85rem',
              }}>
                <div style={{ width: '3px', height: '14px', background: T.amber, borderRadius: '2px' }} />
                <h3 style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.amber }}>
                  Requirements
                </h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                {campaign.requirements.map((req, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: T.textSecondary }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: T.greenPale, color: T.green, flexShrink: 0, marginTop: '1px',
                    }}>
                      <CheckCircle size={13} />
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Impact goal */}
            <Card style={{ padding: '2rem' }}>
              <SectionTitle>Impact Goal</SectionTitle>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '16px',
                  background: `${accentColor}10`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0,
                  border: `1px solid ${accentColor}20`,
                }}>
                  {vertical?.icon}
                </div>
                <div>
                  <p style={{ fontSize: '2.25rem', fontWeight: 800, color: accentColor, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {campaign.impact.target.toLocaleString()}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: T.textMuted, marginTop: '4px' }}>
                    {campaign.impact.metric} (Target)
                  </p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{
                    background: impactPct >= 75 ? '#E8F5EE' : impactPct >= 40 ? '#FDF3E7' : '#FEF2F2',
                    color: impactPct >= 75 ? T.green : impactPct >= 40 ? T.amber : '#DC2626',
                    fontSize: '1.1rem', fontWeight: 800, padding: '6px 14px',
                    borderRadius: '10px',
                  }}>
                    {impactPct}%
                  </div>
                  <p style={{ fontSize: '0.7rem', color: T.textMuted, marginTop: '4px' }}>complete</p>
                </div>
              </div>
              {campaign.impact.current > 0 && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                    <span style={{ color: T.textSecondary }}>{campaign.impact.current.toLocaleString()} achieved</span>
                    <span style={{ color: T.textMuted }}>{campaign.impact.target.toLocaleString()} goal</span>
                  </div>
                  <div style={{ height: '10px', background: '#EEF2EF', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: '99px',
                      width: `${impactPct}%`,
                      background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)`,
                      transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                    }} />
                  </div>
                </>
              )}
            </Card>

            {/* Location */}
            <Card style={{ padding: '2rem' }}>
              <SectionTitle>Location</SectionTitle>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: T.greenPale, color: T.green,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: T.textPrimary, fontSize: '0.95rem' }}>{campaign.location}</p>
                  <p style={{ fontSize: '0.8rem', color: T.textMuted, marginTop: '3px' }}>{campaign.city}, India</p>
                </div>
              </div>
              <div style={{
                height: '160px', borderRadius: T.radiusSm,
                background: `linear-gradient(135deg, ${T.greenPale}, #d4ede0)`,
                border: `1px solid ${T.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '8px',
              }}>
                <MapPin size={28} color={`${accentColor}60`} />
                <p style={{ fontSize: '0.8rem', color: T.textMuted }}>Map preview · {campaign.location}</p>
              </div>
            </Card>
          </div>

          {/* ── Sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '90px' }}>

            {/* Enroll card */}
            <Card style={{ padding: '1.5rem', overflow: 'hidden', position: 'relative' }}>
              {/* accent stripe */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:`linear-gradient(90deg, ${accentColor}, ${accentColor}80)` }} />

              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: T.textMuted, marginBottom: '10px' }}>
                Volunteer Progress
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '10px' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: accentColor, lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {campaign.enrolledCount}
                </span>
                <span style={{ color: T.textMuted, marginBottom: '6px', fontSize: '1rem' }}>
                  / {campaign.maxVolunteers}
                </span>
              </div>
              <div style={{ height: '8px', background: '#EEF2EF', borderRadius: '99px', overflow: 'hidden', marginBottom: '6px' }}>
                <div style={{
                  height: '100%', borderRadius: '99px',
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${accentColor}, ${accentColor}90)`,
                }} />
              </div>
              <p style={{ fontSize: '0.75rem', color: spotsLeft <= 5 ? '#DC2626' : T.textMuted, marginBottom: '1.25rem', fontWeight: spotsLeft <= 5 ? 600 : 400 }}>
                {spotsLeft <= 5 ? `⚠ Only ${spotsLeft} spots left!` : `${spotsLeft} spots remaining`}
              </p>

              {enrolled ? (
                <div style={{
                  background: T.greenPale, borderRadius: T.radiusSm,
                  padding: '1rem', textAlign: 'center',
                  border: `1px solid ${T.green}25`,
                }}>
                  <CheckCircle size={28} color={T.green} style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: 700, color: T.green, fontSize: '0.95rem' }}>You're enrolled!</p>
                  <p style={{ fontSize: '0.75rem', color: T.greenLight, marginTop: '4px' }}>Check My Campaigns for details</p>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  style={{
                    width: '100%', padding: '13px',
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
                    color: '#fff', border: 'none', borderRadius: T.radiusSm,
                    fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                    letterSpacing: '0.01em',
                    boxShadow: `0 4px 16px ${accentColor}40`,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${accentColor}50`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 16px ${accentColor}40`; }}
                >
                  Join This Campaign
                </button>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                {[
                  { icon: <Share2 size={14} />, label: 'Share' },
                  { icon: <Heart size={14} fill={saved ? T.green : 'none'} color={saved ? T.green : T.textSecondary} />, label: saved ? 'Saved' : 'Save', onClick: () => setSaved(s => !s) },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.onClick}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      padding: '9px', borderRadius: T.radiusSm,
                      border: `1px solid ${T.border}`, background: T.white,
                      color: T.textSecondary, fontSize: '0.8rem', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = T.greenPale; e.currentTarget.style.borderColor = T.green; e.currentTarget.style.color = T.green; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.white; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textSecondary; }}
                  >
                    {btn.icon} {btn.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Coordinator card */}
            <Card style={{ padding: '1.25rem' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: T.textMuted, marginBottom: '12px' }}>
                Campaign Coordinator
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${accentColor}25`,
                }}>
                  <User size={20} color={accentColor} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: T.textPrimary, fontSize: '0.9rem' }}>{campaign.coordinator}</p>
                  <p style={{ fontSize: '0.75rem', color: T.textMuted, marginTop: '2px' }}>{vertical?.name} Lead</p>
                </div>
              </div>
            </Card>

            {/* Mini stats card */}
            <Card style={{ padding: '1.25rem', background: T.greenPale, border: `1px solid ${T.green}20` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Award size={16} color={T.green} />
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: T.green, letterSpacing: '0.04em' }}>Campaign Stats</p>
              </div>
              {[
                { label: 'Enrollment rate', value: `${progress}%` },
                { label: 'Impact achieved', value: `${impactPct}%` },
                { label: 'Spots left', value: spotsLeft },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < 2 ? `1px solid ${T.green}15` : 'none' }}>
                  <span style={{ fontSize: '0.78rem', color: T.textSecondary }}>{s.label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: T.green }}>{s.value}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>

      {/* ── Enrollment Modal ── */}
      {showModal && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(10,30,20,0.55)', backdropFilter: 'blur(6px)',
            padding: '1rem',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div style={{
            background: T.white, borderRadius: T.radiusXl,
            padding: '2.25rem', maxWidth: '420px', width: '100%',
            boxShadow: T.shadowLg,
            animation: 'slideUp 0.25s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{
                width: '68px', height: '68px', borderRadius: '18px',
                background: `${accentColor}10`, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', margin: '0 auto 1rem',
                border: `1px solid ${accentColor}20`,
              }}>
                {vertical?.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: T.textPrimary, marginBottom: '6px', fontFamily: 'Georgia, serif' }}>
                Confirm Enrollment
              </h3>
              <p style={{ fontSize: '0.875rem', color: T.textSecondary, lineHeight: 1.6 }}>
                You're about to join <strong style={{ color: T.textPrimary }}>{campaign.title}</strong>
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: '12px', borderRadius: T.radiusSm,
                  border: `1px solid ${T.border}`, background: T.white,
                  color: T.textSecondary, fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmEnroll}
                style={{
                  padding: '12px', borderRadius: T.radiusSm, border: 'none',
                  background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
                  color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                  boxShadow: `0 4px 16px ${accentColor}40`,
                }}
              >
                Confirm & Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}