import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Megaphone, FileCheck, LogOut, Leaf, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminSidebar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { to: '/admin',            label: 'Dashboard', icon: <LayoutDashboard size={18} />, desc: 'Overview & analytics' },
    { to: '/admin/campaigns',  label: 'Campaigns', icon: <Megaphone size={18} />,       desc: 'Manage drives'       },
    { to: '/admin/documents',  label: 'Documents', icon: <FileCheck size={18} />,       desc: 'Verify volunteers'   },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0,
      width: 240, minHeight: '100vh',
      background: 'linear-gradient(180deg, #0D2B18 0%, #1A4D2E 55%, #1F5C35 100%)',
      zIndex: 50, display: 'flex', flexDirection: 'column',
      padding: '1.5rem 1rem',
      boxShadow: '4px 0 32px rgba(0,0,0,0.2)',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>

      {/* ── Logo ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.5rem 0.75rem 0', marginBottom: '2rem' }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Leaf size={19} color="#fff" />
        </div>
        <div>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 17, fontWeight: 700, color: '#fff',
            letterSpacing: '-0.01em', display: 'block', lineHeight: 1,
          }}>
            Samarthya
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontWeight: 500, letterSpacing: '0.05em', marginTop: 2, display: 'block' }}>
            ADMIN PANEL
          </span>
        </div>
      </div>

      {/* ── Section label ── */}
      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '0 0.75rem', marginBottom: 6 }}>
        Navigation
      </p>

      {/* ── Nav items ── */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {menuItems.map(item => {
          const active = location.pathname === item.to;
          return (
            <Link key={item.to} to={item.to} style={{
              display: 'flex', alignItems: 'center', gap: 11,
              padding: '10px 12px', borderRadius: 12, textDecoration: 'none',
              background: active ? 'rgba(255,255,255,0.13)' : 'transparent',
              border: active ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
              transition: 'all 0.18s',
              position: 'relative',
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; } }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; } }}
            >
              {/* Active indicator */}
              {active && (
                <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: 3, borderRadius: '0 2px 2px 0', background: '#6EE7A8' }} />
              )}
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                color: active ? '#fff' : 'rgba(255,255,255,0.55)',
                transition: 'all 0.18s',
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#fff' : 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', margin: '2px 0 0', lineHeight: 1 }}>
                  {item.desc}
                </p>
              </div>
              {active && <ChevronRight size={12} color="rgba(255,255,255,0.4)" />}
            </Link>
          );
        })}
      </nav>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />

      {/* ── Logout ── */}
      <button onClick={handleLogout} style={{
        display: 'flex', alignItems: 'center', gap: 11,
        padding: '10px 12px', borderRadius: 12,
        border: '1px solid transparent', background: 'transparent',
        cursor: 'pointer', transition: 'all 0.18s', width: '100%',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
      >
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(239,68,68,0.12)', color: 'rgba(239,68,68,0.8)',
        }}>
          <LogOut size={16} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.5)' }}>Sign Out</span>
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>
    </aside>
  );
}