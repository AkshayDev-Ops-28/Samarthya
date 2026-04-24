import { User, MapPin, Phone, Mail, Calendar, Clock, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { volunteerProfile } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { NGOBadgeByName } from '../components/NGOBadge';
import HoursBarChart from '../components/HoursBarChart';
import NGOPieChart from '../components/NGOPieChart';
import ActivityWheel from '../components/ActivityWheel';
import ImpactCounter from '../components/ImpactCounter';

const T = {
  green:       '#1A4D2E',
  greenLight:  '#2E7D32',
  greenPale:   '#E8F5EE',
  amber:       '#D4891A',
  amberPale:   '#FDF3E7',
  blue:        '#1976D2',
  white:       '#FFFFFF',
  surface:     '#F5F7F2',
  border:      '#E8EDE5',
  textPrimary: '#1A1A1A',
  textSecondary:'#4A6358',
  textMuted:   '#8FA99C',
  shadow:      '0 2px 16px rgba(26,77,46,0.07)',
  shadowMd:    '0 8px 32px rgba(26,77,46,0.11)',
  radius:      '16px',
  radiusSm:    '10px',
};

const Card = ({ children, style = {} }) => (
  <div style={{
    background: T.white, border: `1px solid ${T.border}`,
    borderRadius: T.radius, boxShadow: T.shadow, ...style,
  }}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 style={{
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '1.05rem', fontWeight: 700, color: T.textPrimary,
    marginBottom: '1rem', letterSpacing: '-0.01em',
  }}>
    {children}
  </h3>
);

const docStatusConfig = {
  approved: { icon: <CheckCircle size={13} />, bg:'#E8F5EE', color:'#1A4D2E', label:'Approved' },
  pending:  { icon: <Loader size={13} />,      bg:'#FDF3E7', color:'#D4891A', label:'Pending'  },
  rejected: { icon: <AlertCircle size={13} />, bg:'#FEF2F2', color:'#B91C1C', label:'Rejected' },
};

export default function Profile() {
  const { user } = useAuth();
  const p = volunteerProfile;

  return (
    <div style={{ minHeight:'100vh', paddingTop:'6rem', paddingBottom:'5rem', background:T.surface, fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(1rem,5vw,2.5rem)', display:'flex', flexDirection:'column', gap:'1.5rem' }}>

        {/* ── Profile Header ── */}
        <Card>
          {/* Banner */}
          <div style={{
            height: 140, borderRadius:`${T.radius} ${T.radius} 0 0`,
            background:'linear-gradient(135deg, #0D2B18 0%, #1A4D2E 55%, #2E7D32 100%)',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize:'22px 22px' }} />
            <div style={{ position:'absolute', width:200, height:200, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.07)', top:'-60px', right:'-40px' }} />
            <div style={{ position:'absolute', width:120, height:120, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.05)', bottom:'-30px', left:'8%' }} />
          </div>

          {/* Content below banner */}
          <div style={{ padding:'0 2rem 2rem', marginTop:'-2.75rem', position:'relative' }}>
            <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', gap:'1.25rem' }}>
              {/* Avatar */}
              <div style={{
                width:72, height:72, borderRadius:16, flexShrink:0,
                background:`linear-gradient(135deg, ${T.green}, ${T.greenLight})`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.75rem', fontWeight:800, color:'#fff',
                border:`4px solid ${T.white}`,
                boxShadow:`0 4px 16px rgba(26,77,46,0.3)`,
                fontFamily:"'Playfair Display', serif",
              }}>
                {p.fullName.charAt(0)}
              </div>

              {/* Name + bio */}
              <div style={{ flex:1, minWidth:200, paddingTop:'2.5rem' }}>
                <h1 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:'1.4rem', fontWeight:700, color:T.textPrimary, marginBottom:4, letterSpacing:'-0.01em' }}>
                  {p.fullName}
                </h1>
                <p style={{ fontSize:13, color:T.textSecondary, lineHeight:1.55, marginBottom:10 }}>{p.bio}</p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {p.ngoAffiliations.map(n => <NGOBadgeByName key={n} name={n} size="xs" />)}
                </div>
              </div>

              {/* Stats pills */}
              <div style={{ display:'flex', gap:12, flexShrink:0, paddingTop:'2rem' }}>
                {[
                  { value: p.totalHours, label:'Hours', color:T.green },
                  { value: p.campaignsJoined, label:'Campaigns', color:T.amber },
                ].map((s, i) => (
                  <div key={i} style={{
                    textAlign:'center', padding:'12px 20px',
                    background: i === 0 ? T.greenPale : T.amberPale,
                    borderRadius:12, border:`1px solid ${i === 0 ? '#C0DEC9' : '#F0D9B5'}`,
                  }}>
                    <p style={{ fontSize:'1.6rem', fontWeight:800, color:s.color, lineHeight:1, letterSpacing:'-0.02em', fontFamily:"'Playfair Display', serif" }}>{s.value}</p>
                    <p style={{ fontSize:11, color:T.textMuted, marginTop:3, fontWeight:600, letterSpacing:'0.02em' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ── Info & Documents ── */}
        <div style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap:'1.5rem' }}>
          {/* Personal Info */}
          <Card style={{ padding:'1.5rem' }}>
            <SectionTitle>Personal Info</SectionTitle>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[
                { icon:<Mail size={15} />,     label:'Email',  value:p.email },
                { icon:<Phone size={15} />,    label:'Phone',  value:p.phone },
                { icon:<MapPin size={15} />,   label:'City',   value:p.city },
                { icon:<Calendar size={15} />, label:'Joined', value:new Date(p.joinedDate).toLocaleDateString('en-IN',{month:'long',year:'numeric'}) },
              ].map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:T.greenPale, color:T.green, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize:10, color:T.textMuted, fontWeight:600, letterSpacing:'0.04em', textTransform:'uppercase' }}>{item.label}</p>
                    <p style={{ fontSize:13, fontWeight:600, color:T.textPrimary, marginTop:1 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop:'1.25rem', paddingTop:'1.25rem', borderTop:`1px solid ${T.border}` }}>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:T.textMuted, marginBottom:10 }}>Skills</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {p.skills.map(s => (
                  <span key={s} style={{
                    padding:'4px 11px', borderRadius:20,
                    background:T.greenPale, color:T.green,
                    fontSize:11, fontWeight:600,
                    border:`1px solid #C0DEC9`,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          </Card>

          {/* Documents */}
          <Card style={{ padding:'1.5rem' }}>
            <SectionTitle>Documents</SectionTitle>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {p.documents.map(doc => {
                const cfg = docStatusConfig[doc.status] || docStatusConfig.pending;
                return (
                  <div key={doc.id} style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'14px 16px', borderRadius:12,
                    background:T.surface, border:`1px solid ${T.border}`,
                  }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:T.greenPale, color:T.green, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <FileText size={17} />
                      </div>
                      <div>
                        <p style={{ fontSize:13, fontWeight:600, color:T.textPrimary }}>{doc.type}</p>
                        <p style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>
                          Uploaded {new Date(doc.uploadedAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:5,
                      padding:'4px 12px', borderRadius:20,
                      fontSize:11, fontWeight:700,
                      background:cfg.bg, color:cfg.color,
                      border:`1px solid ${cfg.color}25`,
                      textTransform:'capitalize',
                    }}>
                      {cfg.icon} {cfg.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ── Impact Counters ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
          <ImpactCounter icon="🍽️" label="Meals Served"    value={320} color="#D4891A" />
          <ImpactCounter icon="👶" label="Children Helped"  value={45}  color="#1976D2" />
          <ImpactCounter icon="🐾" label="Animals Rescued"  value={12}  color="#C0392B" />
          <ImpactCounter icon="🌳" label="Trees Planted"    value={88}  color="#2E7D32" />
        </div>

        {/* ── Charts Row 1 ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
          <Card style={{ padding:'1.5rem' }}><HoursBarChart /></Card>
          <Card style={{ padding:'1.5rem' }}><NGOPieChart /></Card>
        </div>

        {/* ── Charts Row 2 ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
          <Card style={{ padding:'1.5rem' }}><ActivityWheel /></Card>

          {/* Recent Campaigns */}
          <Card style={{ padding:'1.5rem' }}>
            <SectionTitle>Recent Campaigns</SectionTitle>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {p.enrolledCampaigns.map(c => (
                <div key={c.campaignId} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'13px 14px', borderRadius:12,
                  background:T.surface, border:`1px solid ${T.border}`,
                  transition:'background 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background=T.greenPale}
                  onMouseLeave={e => e.currentTarget.style.background=T.surface}
                >
                  <div>
                    <p style={{ fontSize:13, fontWeight:600, color:T.textPrimary }}>{c.title}</p>
                    <p style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>
                      {c.vertical} · <span style={{ fontWeight:600, color:T.green }}>{c.hoursLogged}h</span> logged
                    </p>
                  </div>
                  <span style={{
                    fontSize:11, fontWeight:700, padding:'4px 11px', borderRadius:20,
                    background: c.status === 'active' ? T.greenPale : '#F3F4F6',
                    color:      c.status === 'active' ? T.green     : '#6B7280',
                    border:     c.status === 'active' ? `1px solid #C0DEC9` : '1px solid #E5E7EB',
                    textTransform:'capitalize',
                  }}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @media (max-width: 900px) {
          .profile-info-grid { grid-template-columns: 1fr !important; }
          .profile-chart-grid { grid-template-columns: 1fr !important; }
          .profile-impact-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}