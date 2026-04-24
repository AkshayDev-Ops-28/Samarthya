import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await login(email, password, 'volunteer');
      navigate('/profile');
    } catch { setError('Invalid credentials'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', sans-serif", background: '#F5F7F2' }}>

      {/* ── Left: Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-8 py-16 bg-white">
        <div className="w-full max-w-md">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-10 no-underline">
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#1A4D2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={20} color="white" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#1A4D2E' }}>Samarthya</span>
          </Link>

          {/* Heading */}
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 32 }}>
            Log in to track your impact and manage campaigns.
          </p>

          {/* Error */}
          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '10px 14px', marginBottom: 20, fontSize: 13, color: '#B91C1C' }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  border: '1.5px solid #E8EDE5', borderRadius: 12,
                  padding: '12px 16px', fontSize: 14, color: '#1A1A1A',
                  background: '#fff', outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#1A4D2E'}
                onBlur={e => e.target.style.borderColor = '#E8EDE5'}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    border: '1.5px solid #E8EDE5', borderRadius: 12,
                    padding: '12px 48px 12px 16px', fontSize: 14, color: '#1A1A1A',
                    background: '#fff', outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#1A4D2E'}
                  onBlur={e => e.target.style.borderColor = '#E8EDE5'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div style={{ textAlign: 'right', marginTop: 6 }}>
                <span style={{ fontSize: 12, color: '#1A4D2E', cursor: 'pointer', fontWeight: 500 }}>Forgot password?</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px 0',
                background: loading ? '#6B7280' : '#1A4D2E',
                color: '#fff', border: 'none', borderRadius: 12,
                fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'background 0.2s',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={e => { if (!loading) e.target.style.background = '#2E7D32'; }}
              onMouseLeave={e => { if (!loading) e.target.style.background = '#1A4D2E'; }}
            >
              {loading
                ? <div style={{ width: 20, height: 20, border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                : <><span>Log In</span><ArrowRight size={16} /></>
              }
            </button>
          </form>

          {/* Footer links */}
          <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginTop: 28 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1A4D2E', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
          </p>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Link to="/admin/login" style={{ fontSize: 12, color: '#9CA3AF', textDecoration: 'none' }}>Admin Portal →</Link>
          </div>
        </div>
      </div>

      {/* ── Right: Hero Panel ── */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(145deg, #0D2B18 0%, #1A4D2E 50%, #2E7D32 100%)',
        position: 'relative', overflow: 'hidden',
      }} className="hidden lg:flex">

        {/* Decorative circles */}
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', top: '10%', right: '-80px' }} />
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', bottom: '15%', left: '-40px' }} />

        <div style={{ textAlign: 'center', padding: '48px 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 72, marginBottom: 24, display: 'block' }}>🌿</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
            Track Your Impact
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 300, margin: '0 auto', lineHeight: 1.6 }}>
            Beautiful analytics and personalized volunteer dashboards await.
          </p>

          {/* Stat pills */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}>
            {[['1,155+', 'Volunteers'], ['14', 'Cities'], ['40+', 'Campaigns']].map(([num, label]) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 18px', backdropFilter: 'blur(4px)' }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{num}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        .hidden { display: none; }
        @media (min-width: 1024px) { .hidden.lg\\:flex { display: flex !important; } }
      `}</style>
    </div>
  );
}