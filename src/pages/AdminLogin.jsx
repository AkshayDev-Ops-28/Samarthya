import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Leaf, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const { login }    = useAuth();
  const navigate     = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await login(email, password, 'admin');
      navigate('/admin');
    } catch { setError('Invalid admin credentials'); }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    border: '1.5px solid #E8EDE5', borderRadius: 12,
    padding: '12px 16px', fontSize: 14, color: '#1A1A1A',
    background: '#fff', outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(145deg, #0D2B18 0%, #1A4D2E 50%, #2E7D32 100%)',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative', overflow: 'hidden', padding: '2rem',
    }}>
      {/* Background decorative circles */}
      <div style={{ position:'absolute', width:420, height:420, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.06)', top:'-80px', right:'-80px' }} />
      <div style={{ position:'absolute', width:260, height:260, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.05)', bottom:'5%', left:'-60px' }} />
      <div style={{ position:'absolute', width:140, height:140, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.04)', top:'55%', right:'12%' }} />
      {/* Grid texture */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)',
        backgroundSize:'40px 40px',
      }} />

      {/* Card */}
      <div style={{
        background: '#fff', borderRadius: 24,
        padding: '2.75rem 2.5rem',
        width: '100%', maxWidth: 440,
        boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
        position: 'relative', zIndex: 1,
      }}>

        {/* Admin badge */}
        <div style={{ display:'flex', justifyContent:'center', marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '5px 14px', borderRadius: 20,
            background: 'rgba(212,137,26,0.1)', border: '1px solid rgba(212,137,26,0.2)',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            color: '#D4891A',
          }}>
            <Shield size={12} color="#D4891A" /> Admin Portal
          </div>
        </div>

        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:28, justifyContent:'center' }}>
          <div style={{
            width:42, height:42, borderRadius:12,
            background:'linear-gradient(135deg,#1A4D2E,#2E7D32)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 4px 14px rgba(26,77,46,0.35)',
          }}>
            <Leaf size={20} color="#fff" />
          </div>
          <span style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:24, fontWeight:700, color:'#1A1A1A' }}>
            Samarthya
          </span>
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:28, fontWeight:700, color:'#1A1A1A', marginBottom:6, textAlign:'center' }}>
          Admin Sign In
        </h1>
        <p style={{ color:'#6B7280', fontSize:14, marginBottom:28, textAlign:'center', lineHeight:1.5 }}>
          Access the platform management dashboard.
        </p>

        {/* Error */}
        {error && (
          <div style={{
            background:'#FEF2F2', border:'1px solid #FECACA',
            borderRadius:10, padding:'10px 14px', marginBottom:20,
            fontSize:13, color:'#B91C1C',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#1A1A1A', marginBottom:6 }}>
              Admin Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@samarthya.org" style={inputStyle}
              onFocus={e => e.target.style.borderColor='#1A4D2E'}
              onBlur={e  => e.target.style.borderColor='#E8EDE5'} />
          </div>

          <div>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'#1A1A1A', marginBottom:6 }}>
              Password
            </label>
            <div style={{ position:'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight:48 }}
                onFocus={e => e.target.style.borderColor='#1A4D2E'}
                onBlur={e  => e.target.style.borderColor='#E8EDE5'} />
              <button type="button" onClick={() => setShowPass(p => !p)}
                style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9CA3AF', display:'flex', alignItems:'center' }}>
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width:'100%', padding:'13px 0', marginTop:4,
            background: loading ? '#6B7280' : 'linear-gradient(135deg,#1A4D2E,#2E7D32)',
            color:'#fff', border:'none', borderRadius:12,
            fontSize:15, fontWeight:700,
            cursor: loading ? 'not-allowed' : 'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            boxShadow: loading ? 'none' : '0 4px 16px rgba(26,77,46,0.35)',
            transition:'all 0.2s',
            fontFamily:"'DM Sans', system-ui, sans-serif",
          }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(26,77,46,0.45)'; } }}
            onMouseLeave={e => { if (!loading) { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(26,77,46,0.35)'; } }}
          >
            {loading
              ? <div style={{ width:20, height:20, border:'2.5px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
              : <><span>Sign In</span><ArrowRight size={16} /></>
            }
          </button>
        </form>

        <p style={{ textAlign:'center', fontSize:13, color:'#6B7280', marginTop:24 }}>
          <Link to="/login" style={{ color:'#1A4D2E', fontWeight:600, textDecoration:'none' }}>
            ← Back to Volunteer Login
          </Link>
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}