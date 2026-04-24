import { Users, TrendingUp, Target, Clock } from 'lucide-react';
import { platformStats } from '../data/mockData';

export default function StatsBar() {
  const stats = [
    { icon: <Users size={20} />, value: platformStats.totalVolunteers.toLocaleString(), label: "Volunteers", color: "#1A4D2E" },
    { icon: <Target size={20} />, value: platformStats.activeCampaigns.toString(), label: "Active Campaigns", color: "#D4891A" },
    { icon: <Clock size={20} />, value: platformStats.totalHoursDonated.toLocaleString(), label: "Hours Donated", color: "#1976D2" },
    { icon: <TrendingUp size={20} />, value: platformStats.citiesCovered.toString(), label: "Cities Covered", color: "#2E7D32" },
  ];

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #E8EDE5',
      borderRadius: 20,
      boxShadow: '0 2px 16px rgba(26,77,46,0.07)',
      overflow: 'hidden',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '22px 24px',
              borderRight: i < 3 ? '1px solid #E8EDE5' : 'none',
              cursor: 'default',
              transition: 'background 0.2s',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${stat.color}06`;
              e.currentTarget.querySelector('.stat-icon').style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.querySelector('.stat-icon').style.transform = 'scale(1)';
            }}
          >
            <div
              className="stat-icon"
              style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: `${stat.color}12`, color: stat.color,
                transition: 'transform 0.2s',
              }}
            >
              {stat.icon}
            </div>
            <div>
              <p style={{
                fontSize: '1.55rem', fontWeight: 800, color: stat.color,
                lineHeight: 1, letterSpacing: '-0.02em',
                fontFamily: "'Playfair Display', Georgia, serif",
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 11, color: '#8FA99C', fontWeight: 600, marginTop: 3, letterSpacing: '0.02em' }}>
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        @media (max-width: 768px) {
          .statsbar-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </div>
  );
}