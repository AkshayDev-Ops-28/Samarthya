import { Users, Clock, Target, AlertCircle, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { adminKPIs, volunteersPerVertical, dailySignups, allVolunteers } from '../data/mockData';
import { NGOBadgeByName } from '../components/NGOBadge';

const T = {
  green:        '#1A4D2E',
  greenLight:   '#2E7D32',
  greenPale:    '#E8F5EE',
  amber:        '#D4891A',
  blue:         '#1976D2',
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
  <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:T.radius, boxShadow:T.shadow, ...style }}>
    {children}
  </div>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom:'1.25rem' }}>
    <h3 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:'1.05rem', fontWeight:700, color:T.textPrimary, margin:0, letterSpacing:'-0.01em' }}>
      {children}
    </h3>
    {sub && <p style={{ fontSize:12, color:T.textMuted, marginTop:3 }}>{sub}</p>}
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#fff', border:`1px solid ${T.border}`, borderRadius:10, padding:'8px 14px', boxShadow:T.shadowMd, fontSize:12 }}>
      <p style={{ color:T.textMuted, marginBottom:2 }}>{label}</p>
      <p style={{ fontWeight:700, color:T.green }}>{payload[0].value}</p>
    </div>
  );
};

export default function AdminDashboard() {
  const kpis = [
    { icon:<Users size={20} />,       label:'Total Volunteers',  value:adminKPIs.totalVolunteers.toLocaleString(), color:T.green, change:'+12%',  changeBg:T.greenPale },
    { icon:<AlertCircle size={20} />, label:'Pending Approvals', value:adminKPIs.pendingApprovals.toString(),      color:T.amber, change:'5 new',  changeBg:T.amberPale },
    { icon:<Target size={20} />,      label:'Active Campaigns',  value:adminKPIs.activeCampaigns.toString(),       color:T.blue,  change:'+2',     changeBg:'#E3F0FB'   },
    { icon:<Clock size={20} />,       label:'Hours Logged',      value:adminKPIs.totalHoursLogged.toLocaleString(),color:T.greenLight,change:'+840',changeBg:T.greenPale },
  ];

  const tableHeaders = ['Name','Email','City','Joined','Hours','Status','Verticals'];

  return (
    <div style={{ minHeight:'100vh', paddingTop:'5rem', paddingBottom:'5rem', marginLeft:240, background:T.surface, fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 clamp(1rem,4vw,2.5rem)', display:'flex', flexDirection:'column', gap:'1.75rem' }}>

        {/* ── Page Header ── */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div>
            <h1 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:'clamp(1.75rem,4vw,2.25rem)', fontWeight:700, color:T.textPrimary, letterSpacing:'-0.02em', marginBottom:4 }}>
              Admin Dashboard
            </h1>
            <p style={{ fontSize:14, color:T.textMuted }}>Platform overview and real-time analytics.</p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 14px', borderRadius:20, background:T.greenPale, border:`1px solid #C0DEC9` }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:T.green, animation:'pulse 2s infinite' }} />
            <span style={{ fontSize:12, fontWeight:600, color:T.green }}>Live</span>
          </div>
        </div>

        {/* ── KPI Cards ── */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
          {kpis.map((k, i) => (
            <Card key={i} style={{ padding:'1.4rem', position:'relative', overflow:'hidden' }}>
              {/* subtle top accent */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${k.color},${k.color}80)` }} />
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                <div style={{ width:42, height:42, borderRadius:11, background:`${k.color}12`, color:k.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {k.icon}
                </div>
                <span style={{ fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:12, background:k.changeBg, color:k.color }}>
                  {k.change}
                </span>
              </div>
              <p style={{ fontSize:'1.75rem', fontWeight:800, color:k.color, lineHeight:1, letterSpacing:'-0.02em', fontFamily:"'Playfair Display', serif" }}>
                {k.value}
              </p>
              <p style={{ fontSize:11, color:T.textMuted, marginTop:5, fontWeight:600, letterSpacing:'0.02em' }}>{k.label}</p>
            </Card>
          ))}
        </div>

        {/* ── Charts ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
          <Card style={{ padding:'1.5rem' }}>
            <SectionTitle sub="Distribution across NGO causes">Volunteers per Vertical</SectionTitle>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={volunteersPerVertical} margin={{ top:5, right:5, left:-20, bottom:5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2EF" vertical={false} />
                <XAxis dataKey="vertical" axisLine={false} tickLine={false} tick={{ fontSize:11, fill:T.textMuted }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize:11, fill:T.textMuted }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[7,7,0,0]} maxBarSize={44}>
                  {volunteersPerVertical.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card style={{ padding:'1.5rem' }}>
            <SectionTitle sub="New signups per day (last 30 days)">Platform Growth</SectionTitle>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={dailySignups} margin={{ top:5, right:5, left:-20, bottom:5 }}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={T.green} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={T.green} stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF2EF" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize:10, fill:T.textMuted }} interval={4} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize:11, fill:T.textMuted }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="signups" stroke={T.green} strokeWidth={2.5} fill="url(#growthGrad)" dot={false} activeDot={{ r:5, fill:T.green }} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* ── Volunteers Table ── */}
        <Card>
          <div style={{ padding:'1.25rem 1.5rem', borderBottom:`1px solid ${T.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
            <div>
              <h3 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:'1.05rem', fontWeight:700, color:T.textPrimary, margin:0 }}>
                All Volunteers
              </h3>
              <p style={{ fontSize:12, color:T.textMuted, marginTop:2 }}>{allVolunteers.length} total volunteers</p>
            </div>
            <button style={{
              display:'flex', alignItems:'center', gap:6,
              padding:'8px 16px', borderRadius:10,
              border:`1.5px solid ${T.border}`, background:T.white,
              color:T.textSecondary, fontSize:13, fontWeight:600, cursor:'pointer',
              fontFamily:"'DM Sans', system-ui, sans-serif",
              transition:'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=T.green; e.currentTarget.style.color=T.green; e.currentTarget.style.background=T.greenPale; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.textSecondary; e.currentTarget.style.background=T.white; }}
            >
              <Download size={14} /> Export CSV
            </button>
          </div>

          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#FAFBF9' }}>
                  {tableHeaders.map(h => (
                    <th key={h} style={{
                      textAlign:'left', padding:'11px 20px',
                      fontSize:10, fontWeight:700, letterSpacing:'0.05em',
                      textTransform:'uppercase', color:T.textMuted,
                      borderBottom:`1px solid ${T.border}`,
                      whiteSpace:'nowrap',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allVolunteers.map((v, idx) => (
                  <tr key={v.id} style={{
                    borderBottom: idx < allVolunteers.length - 1 ? `1px solid ${T.border}` : 'none',
                    transition:'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background=T.greenPale}
                    onMouseLeave={e => e.currentTarget.style.background='transparent'}
                  >
                    <td style={{ padding:'13px 20px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{
                          width:32, height:32, borderRadius:'50%', flexShrink:0,
                          background:`linear-gradient(135deg,${T.green}18,${T.green}30)`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:12, fontWeight:700, color:T.green,
                        }}>
                          {v.name.charAt(0)}
                        </div>
                        <span style={{ fontSize:13, fontWeight:600, color:T.textPrimary }}>{v.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:'13px 20px', fontSize:13, color:T.textSecondary }}>{v.email}</td>
                    <td style={{ padding:'13px 20px', fontSize:13, color:T.textSecondary }}>{v.city}</td>
                    <td style={{ padding:'13px 20px', fontSize:13, color:T.textMuted }}>
                      {new Date(v.joinedDate).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}
                    </td>
                    <td style={{ padding:'13px 20px' }}>
                      <span style={{ fontSize:13, fontWeight:700, color:T.green }}>{v.hours}h</span>
                    </td>
                    <td style={{ padding:'13px 20px' }}>
                      <span style={{
                        fontSize:11, fontWeight:700, padding:'4px 11px', borderRadius:20,
                        background: v.status==='approved' ? T.greenPale : T.amberPale,
                        color:      v.status==='approved' ? T.green     : T.amber,
                        border:     v.status==='approved' ? '1px solid #C0DEC9' : '1px solid #F0D9B5',
                        textTransform:'capitalize',
                      }}>
                        {v.status}
                      </span>
                    </td>
                    <td style={{ padding:'13px 20px' }}>
                      <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                        {v.verticals.map(n => <NGOBadgeByName key={n} name={n} size="xs" />)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @media (max-width:900px) {
          .kpi-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .chart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}