import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, ArrowLeft, Upload, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { verticals } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const steps = ['Account', 'Profile', 'Interests', 'Documents', 'Done'];

const heroSlides = [
  { icon: '🌱', title: 'Join the Movement', sub: '1,155+ volunteers across 14 cities are already making an impact.' },
  { icon: '🤝', title: 'Choose Your Cause', sub: 'From education to environment — find campaigns that match your passion.' },
  { icon: '📍', title: 'Make It Local', sub: 'Volunteer drives in your city, organised by trusted NGOs.' },
  { icon: '🏆', title: 'Track Your Impact', sub: 'Beautiful dashboards to see every hour you\'ve contributed.' },
];

/* ── Reusable input style (matches Login exactly) ── */
const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  border: '1.5px solid #E8EDE5', borderRadius: 12,
  padding: '12px 16px', fontSize: 14, color: '#1A1A1A',
  background: '#fff', outline: 'none',
  transition: 'border-color 0.2s',
  fontFamily: "'DM Sans', sans-serif",
};

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: '#1A1A1A', marginBottom: 6,
};

export default function Register() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    email: '', password: '', confirmPassword: '',
    fullName: '', phone: '', city: '', dob: '', bio: '',
    interests: [], docFile: null,
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const toggleInterest = (id) => setForm(prev => ({
    ...prev,
    interests: prev.interests.includes(id)
      ? prev.interests.filter(i => i !== id)
      : [...prev.interests, id],
  }));

  const handleSubmit = async () => {
    setLoading(true);
    await register(form);
    setStep(4);
    setLoading(false);
  };

  const canNext = () => {
    if (step === 0) return form.email && form.password && form.password === form.confirmPassword;
    if (step === 1) return form.fullName && form.city;
    if (step === 2) return form.interests.length > 0;
    return true;
  };

  const pwMismatch = form.confirmPassword && form.password !== form.confirmPassword;
  const heroData = heroSlides[Math.min(step, heroSlides.length - 1)];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'DM Sans', sans-serif", background: '#F5F7F2' }}>

      {/* ── Left: Form Panel ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', background: '#fff', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 460 }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#1A4D2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={20} color="white" />
            </div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#1A4D2E' }}>Samarthya</span>
          </Link>

          {/* Step progress */}
          {step < 4 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32 }}>
              {steps.slice(0, 4).map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                    background: i < step ? '#1A4D2E' : i === step ? '#1A4D2E' : '#F0F4F0',
                    color: i <= step ? '#fff' : '#9CA3AF',
                    transition: 'all 0.3s',
                    border: i === step ? '2px solid #1A4D2E' : '2px solid transparent',
                    boxShadow: i === step ? '0 0 0 3px rgba(26,77,46,0.15)' : 'none',
                  }}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  {i < 3 && (
                    <div style={{ flex: 1, height: 2, background: i < step ? '#1A4D2E' : '#E8EDE5', transition: 'background 0.3s', margin: '0 4px' }} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Step 0: Account ── */}
          {step === 0 && (
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>
                Create your account
              </h1>
              <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 28 }}>
                Start your volunteering journey with Samarthya.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                    placeholder="you@example.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#1A4D2E'}
                    onBlur={e => e.target.style.borderColor = '#E8EDE5'} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showPass ? 'text' : 'password'} value={form.password}
                      onChange={e => update('password', e.target.value)}
                      placeholder="Min 8 characters"
                      style={{ ...inputStyle, paddingRight: 48 }}
                      onFocus={e => e.target.style.borderColor = '#1A4D2E'}
                      onBlur={e => e.target.style.borderColor = '#E8EDE5'} />
                    <button type="button" onClick={() => setShowPass(p => !p)}
                      style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <input type={showConfirm ? 'text' : 'password'} value={form.confirmPassword}
                      onChange={e => update('confirmPassword', e.target.value)}
                      placeholder="Re-enter password"
                      style={{ ...inputStyle, paddingRight: 48, borderColor: pwMismatch ? '#EF4444' : '#E8EDE5' }}
                      onFocus={e => e.target.style.borderColor = pwMismatch ? '#EF4444' : '#1A4D2E'}
                      onBlur={e => e.target.style.borderColor = pwMismatch ? '#EF4444' : '#E8EDE5'} />
                    <button type="button" onClick={() => setShowConfirm(p => !p)}
                      style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {pwMismatch && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 5 }}>Passwords don't match</p>}
                </div>
              </div>
            </div>
          )}

          {/* ── Step 1: Profile ── */}
          {step === 1 && (
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>
                Your profile
              </h1>
              <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 28 }}>Tell us a little about yourself.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" value={form.fullName} onChange={e => update('fullName', e.target.value)}
                    placeholder="Your full name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#1A4D2E'}
                    onBlur={e => e.target.style.borderColor = '#E8EDE5'} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                      placeholder="+91 98765 43210" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#1A4D2E'}
                      onBlur={e => e.target.style.borderColor = '#E8EDE5'} />
                  </div>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input type="text" value={form.city} onChange={e => update('city', e.target.value)}
                      placeholder="Mumbai" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#1A4D2E'}
                      onBlur={e => e.target.style.borderColor = '#E8EDE5'} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Date of Birth</label>
                  <input type="date" value={form.dob} onChange={e => update('dob', e.target.value)}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#1A4D2E'}
                    onBlur={e => e.target.style.borderColor = '#E8EDE5'} />
                </div>
                <div>
                  <label style={labelStyle}>Bio <span style={{ fontWeight: 400, color: '#9CA3AF' }}>(optional)</span></label>
                  <textarea value={form.bio} onChange={e => update('bio', e.target.value)}
                    rows={3} placeholder="Tell us about yourself..."
                    style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                    onFocus={e => e.target.style.borderColor = '#1A4D2E'}
                    onBlur={e => e.target.style.borderColor = '#E8EDE5'} />
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: Interests ── */}
          {step === 2 && (
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>
                Choose your causes
              </h1>
              <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 28 }}>
                Select one or more verticals you're passionate about.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {verticals.map(v => {
                  const selected = form.interests.includes(v.id);
                  return (
                    <button key={v.id} onClick={() => toggleInterest(v.id)}
                      style={{
                        padding: '16px', borderRadius: 14, textAlign: 'left', cursor: 'pointer',
                        border: selected ? '2px solid #1A4D2E' : '1.5px solid #E8EDE5',
                        background: selected ? 'rgba(26,77,46,0.05)' : '#fff',
                        boxShadow: selected ? '0 0 0 3px rgba(26,77,46,0.08)' : 'none',
                        transition: 'all 0.2s',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = 'rgba(26,77,46,0.35)'; }}
                      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = '#E8EDE5'; }}
                    >
                      <span style={{ fontSize: 26, display: 'block', marginBottom: 8 }}>{v.icon}</span>
                      <p style={{ fontWeight: 700, color: '#1A1A1A', fontSize: 13, marginBottom: 3 }}>{v.name}</p>
                      <p style={{ fontSize: 11, color: '#9CA3AF', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {v.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 3: Documents ── */}
          {step === 3 && (
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>
                Upload documents
              </h1>
              <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 28 }}>
                Upload your ID for verification — optional, can be done later.
              </p>
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <div style={{
                  border: '2px dashed #D1D9CE', borderRadius: 16, padding: '3rem 2rem',
                  textAlign: 'center', transition: 'all 0.2s',
                  background: form.docFile ? 'rgba(26,77,46,0.03)' : '#FAFBF9',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#1A4D2E'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = form.docFile ? '#1A4D2E' : '#D1D9CE'}
                >
                  {form.docFile ? (
                    <>
                      <CheckCircle size={40} color="#1A4D2E" style={{ margin: '0 auto 12px' }} />
                      <p style={{ fontWeight: 700, color: '#1A4D2E', fontSize: 14, marginBottom: 4 }}>{form.docFile.name}</p>
                      <p style={{ fontSize: 12, color: '#9CA3AF' }}>Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload size={36} color="#9CA3AF" style={{ margin: '0 auto 12px' }} />
                      <p style={{ fontWeight: 600, color: '#1A1A1A', fontSize: 14, marginBottom: 6 }}>Drag & drop or click to upload</p>
                      <p style={{ fontSize: 12, color: '#9CA3AF', lineHeight: 1.6 }}>
                        Aadhar Card, College ID, or Certificates<br />PDF, JPG, PNG — max 10MB
                      </p>
                    </>
                  )}
                </div>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: 'none' }}
                  onChange={e => update('docFile', e.target.files[0] || null)} />
              </label>
            </div>
          )}

          {/* ── Step 4: Done ── */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'rgba(26,77,46,0.08)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
              }}>
                <CheckCircle size={40} color="#1A4D2E" />
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>
                Welcome aboard! 🎉
              </h1>
              <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 36, lineHeight: 1.6 }}>
                Your account is ready. Start exploring campaigns<br />and making your mark.
              </p>
              <Link to="/campaigns" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', background: '#1A4D2E', color: '#fff',
                borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#2E7D32'}
                onMouseLeave={e => e.currentTarget.style.background = '#1A4D2E'}
              >
                Browse Campaigns <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* ── Navigation buttons ── */}
          {step < 4 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
              {step > 0 && (
                <button onClick={() => setStep(step - 1)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '12px 18px', borderRadius: 12,
                    border: '1.5px solid #E8EDE5', background: '#fff',
                    color: '#6B7280', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#1A4D2E'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#E8EDE5'}
                >
                  <ArrowLeft size={15} /> Back
                </button>
              )}
              <button
                onClick={() => step === 3 ? handleSubmit() : setStep(step + 1)}
                disabled={!canNext() || loading}
                style={{
                  flex: 1, padding: '13px 0',
                  background: !canNext() || loading ? '#9CA3AF' : '#1A4D2E',
                  color: '#fff', border: 'none', borderRadius: 12,
                  fontSize: 15, fontWeight: 600,
                  cursor: !canNext() || loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  transition: 'background 0.2s',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={e => { if (canNext() && !loading) e.currentTarget.style.background = '#2E7D32'; }}
                onMouseLeave={e => { if (canNext() && !loading) e.currentTarget.style.background = '#1A4D2E'; }}
              >
                {loading
                  ? <div style={{ width: 20, height: 20, border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  : step === 3
                    ? <><span>Complete Registration</span><ArrowRight size={16} /></>
                    : <><span>Continue</span><ArrowRight size={16} /></>
                }
              </button>
            </div>
          )}

          {step === 0 && (
            <p style={{ textAlign: 'center', fontSize: 13, color: '#6B7280', marginTop: 24 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#1A4D2E', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
            </p>
          )}
        </div>
      </div>

      {/* ── Right: Hero Panel (matches Login exactly) ── */}
      <div style={{
        flex: 1, alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(145deg, #0D2B18 0%, #1A4D2E 50%, #2E7D32 100%)',
        position: 'relative', overflow: 'hidden',
      }} className="hidden lg:flex">

        {/* Decorative circles */}
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', top: '10%', right: '-80px' }} />
        <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', bottom: '15%', left: '-40px' }} />
        <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', top: '55%', right: '15%' }} />

        <div style={{ textAlign: 'center', padding: '48px 40px', position: 'relative', zIndex: 1, transition: 'all 0.4s' }}>
          <div style={{ fontSize: 72, marginBottom: 24, display: 'block' }}>{heroData.icon}</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.2 }}>
            {heroData.title}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 300, margin: '0 auto', lineHeight: 1.6 }}>
            {heroData.sub}
          </p>

          {/* Step indicator dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
            {heroSlides.map((_, i) => (
              <div key={i} style={{
                width: i === Math.min(step, heroSlides.length - 1) ? 24 : 8,
                height: 8, borderRadius: 4,
                background: i === Math.min(step, heroSlides.length - 1) ? '#fff' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.3s',
              }} />
            ))}
          </div>

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