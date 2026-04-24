import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Leaf, LogOut, User, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e) => {
      if (!e.target.closest('#user-menu-wrapper')) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [userMenuOpen]);

  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = isAdmin
    ? [
        { to: '/admin', label: 'Dashboard' },
        { to: '/admin/campaigns', label: 'Campaigns' },
        { to: '/admin/documents', label: 'Documents' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/campaigns', label: 'Campaigns' },
        ...(user ? [
          { to: '/my-campaigns', label: 'My Campaigns' },
        ] : []),
      ];

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled
          ? 'rgba(255,255,255,0.97)'
          : '#fff',
        borderBottom: scrolled ? '1px solid #E8EDE5' : '1px solid #E8EDE5',
        boxShadow: scrolled
          ? '0 4px 24px rgba(26,77,46,0.10)'
          : '0 2px 8px rgba(26,77,46,0.05)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>

        {/* ── Top accent bar ── */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, #0D2B18, #1A4D2E 40%, #2E7D32 70%, #4CAF50)',
        }} />

        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 2.5rem)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            height: scrolled ? 68 : 80,
            transition: 'height 0.3s cubic-bezier(0.4,0,0.2,1)',
          }}>

            {/* ── Logo ── */}
            <Link to={isAdmin ? '/admin' : '/'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <div style={{
                width: scrolled ? 40 : 46,
                height: scrolled ? 40 : 46,
                borderRadius: 13,
                background: 'linear-gradient(135deg, #1A4D2E, #2E7D32)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(26,77,46,0.35)',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08) rotate(6deg)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,77,46,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) rotate(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,77,46,0.35)'; }}
              >
                <Leaf size={scrolled ? 20 : 23} color="#fff" />
              </div>
              <div>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: scrolled ? 22 : 26,
                  fontWeight: 700,
                  color: '#1A4D2E',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  display: 'block',
                  transition: 'font-size 0.3s',
                }}>
                  Samarthya
                </span>
                {!scrolled && !isAdmin && (
                  <span style={{
                    fontSize: 11, color: '#6B9E7A', fontWeight: 500,
                    letterSpacing: '0.04em', display: 'block', marginTop: 1,
                  }}>
                    Volunteer Platform
                  </span>
                )}
              </div>
              {isAdmin && (
                <span style={{
                  fontSize: 10, padding: '3px 9px', borderRadius: 20,
                  fontWeight: 700, background: 'rgba(212,137,26,0.12)',
                  color: '#D4891A', letterSpacing: '0.08em', textTransform: 'uppercase',
                  border: '1px solid rgba(212,137,26,0.25)',
                }}>
                  Admin
                </span>
              )}
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-desktop">
              {navLinks.map(link => {
                const active = isActive(link.to);
                return (
                  <Link key={link.to} to={link.to} style={{
                    position: 'relative',
                    padding: '9px 18px',
                    borderRadius: 10,
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                    color: active ? '#1A4D2E' : '#4A6358',
                    background: active ? 'rgba(26,77,46,0.07)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.18s',
                    letterSpacing: '0.01em',
                  }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(26,77,46,0.06)';
                        e.currentTarget.style.color = '#1A4D2E';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#4A6358';
                      }
                    }}
                  >
                    {link.label}
                    {active && (
                      <span style={{
                        position: 'absolute', bottom: 4, left: '50%',
                        transform: 'translateX(-50%)',
                        width: 20, height: 2.5, borderRadius: 2,
                        background: '#1A4D2E',
                        display: 'block',
                      }} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── Right: Auth Area ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }} className="nav-desktop">
              {user ? (
                <div id="user-menu-wrapper" style={{ position: 'relative' }}>
                  <button
                    onClick={() => setUserMenuOpen(o => !o)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 14px 8px 8px',
                      borderRadius: 12,
                      border: '1.5px solid #E8EDE5',
                      background: userMenuOpen ? 'rgba(26,77,46,0.06)' : '#FAFBF9',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#1A4D2E'; e.currentTarget.style.background = 'rgba(26,77,46,0.05)'; }}
                    onMouseLeave={e => { if (!userMenuOpen) { e.currentTarget.style.borderColor = '#E8EDE5'; e.currentTarget.style.background = '#FAFBF9'; } }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #1A4D2E, #2E7D32)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(26,77,46,0.3)',
                    }}>
                      <User size={15} color="#fff" />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1A4D2E', maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {user.fullName}
                    </span>
                    <ChevronDown size={14} color="#6B7280" style={{ transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                      background: '#fff', borderRadius: 14, minWidth: 200,
                      border: '1px solid #E8EDE5',
                      boxShadow: '0 12px 40px rgba(26,77,46,0.15)',
                      overflow: 'hidden',
                      animation: 'dropIn 0.18s cubic-bezier(0.4,0,0.2,1)',
                    }}>
                      <div style={{ padding: '12px 16px', borderBottom: '1px solid #F0F4F0', background: '#FAFBF9' }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>{user.fullName}</p>
                        <p style={{ fontSize: 11, color: '#9CA3AF', margin: '2px 0 0' }}>{user.email}</p>
                      </div>
                      {[
                        { to: '/profile', label: 'My Profile', icon: <User size={14} /> },
                        { to: '/my-campaigns', label: 'My Campaigns', icon: <Leaf size={14} /> },
                      ].map(item => (
                        <Link key={item.to} to={item.to} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '11px 16px', fontSize: 13, fontWeight: 500,
                          color: '#374151', textDecoration: 'none',
                          transition: 'background 0.15s',
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#F5F7F2'; e.currentTarget.style.color = '#1A4D2E'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; }}
                        >
                          <span style={{ color: '#1A4D2E' }}>{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                      <div style={{ borderTop: '1px solid #F0F4F0' }}>
                        <button onClick={handleLogout} style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                          padding: '11px 16px', fontSize: 13, fontWeight: 600,
                          color: '#EF4444', background: 'none', border: 'none',
                          cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s',
                          fontFamily: "'DM Sans', system-ui, sans-serif",
                        }}
                          onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Link to="/login" style={{
                    padding: '9px 20px', borderRadius: 10,
                    fontSize: 14, fontWeight: 600, color: '#1A4D2E',
                    textDecoration: 'none', transition: 'all 0.18s',
                    border: '1.5px solid transparent',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(26,77,46,0.06)'; e.currentTarget.style.border = '1.5px solid rgba(26,77,46,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.border = '1.5px solid transparent'; }}
                  >
                    Log In
                  </Link>
                  <Link to="/register" style={{
                    padding: '10px 22px', borderRadius: 10,
                    fontSize: 14, fontWeight: 700,
                    background: 'linear-gradient(135deg, #1A4D2E, #2E7D32)',
                    color: '#fff', textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(26,77,46,0.35)',
                    transition: 'all 0.2s',
                    letterSpacing: '0.01em',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,77,46,0.45)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,77,46,0.35)'; }}
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="nav-mobile"
              style={{
                padding: '8px', borderRadius: 10, border: '1.5px solid #E8EDE5',
                background: mobileOpen ? 'rgba(26,77,46,0.06)' : '#fff',
                cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center',
                color: '#1A4D2E', transition: 'all 0.2s',
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div style={{
            background: '#fff', borderTop: '1px solid #E8EDE5',
            boxShadow: '0 12px 40px rgba(26,77,46,0.12)',
            animation: 'slideDown 0.22s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <div style={{ padding: '16px 20px 24px' }}>
              {navLinks.map(link => {
                const active = isActive(link.to);
                return (
                  <Link key={link.to} to={link.to} style={{
                    display: 'block', padding: '12px 16px', borderRadius: 10,
                    fontSize: 15, fontWeight: active ? 700 : 500,
                    color: active ? '#1A4D2E' : '#4A6358',
                    background: active ? 'rgba(26,77,46,0.07)' : 'transparent',
                    textDecoration: 'none', marginBottom: 4,
                    borderLeft: active ? '3px solid #1A4D2E' : '3px solid transparent',
                    transition: 'all 0.15s',
                  }}>
                    {link.label}
                  </Link>
                );
              })}

              <div style={{ borderTop: '1px solid #E8EDE5', marginTop: 12, paddingTop: 16 }}>
                {user ? (
                  <>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px', borderRadius: 10,
                      background: '#FAFBF9', border: '1px solid #E8EDE5',
                      marginBottom: 10,
                    }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #1A4D2E, #2E7D32)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={16} color="#fff" />
                      </div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>{user.fullName}</p>
                        <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0 }}>{user.email}</p>
                      </div>
                    </div>
                    <button onClick={handleLogout} style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '12px', borderRadius: 10, border: 'none',
                      background: '#FEF2F2', color: '#EF4444',
                      fontSize: 14, fontWeight: 700, cursor: 'pointer',
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                    }}>
                      <LogOut size={16} /> Sign Out
                    </button>
                  </>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <Link to="/login" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700,
                      color: '#1A4D2E', background: '#F5F7F2',
                      border: '1.5px solid #E8EDE5', textDecoration: 'none',
                    }}>
                      Log In
                    </Link>
                    <Link to="/register" style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 700,
                      color: '#fff', background: 'linear-gradient(135deg, #1A4D2E, #2E7D32)',
                      boxShadow: '0 4px 14px rgba(26,77,46,0.3)', textDecoration: 'none',
                    }}>
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1);    }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}