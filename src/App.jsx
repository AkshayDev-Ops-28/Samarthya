import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AdminSidebar from './components/AdminSidebar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyCampaigns from './pages/MyCampaigns';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminCampaigns from './pages/AdminCampaigns';
import AdminDocuments from './pages/AdminDocuments';

function ScrollToTop() {
  const { pathname } = useLocation();
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isAuthPage = ['/login', '/register', '/admin/login'].includes(pathname);
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';

  return (
    <>
      {!isAuthPage && !isAdminPage && <Navbar />}
      {isAdminPage && <AdminSidebar />}
      <ScrollToTop />
      <main className={isAdminPage ? 'pl-64 min-h-screen bg-[#F5F7F2]' : ''}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-campaigns" element={<MyCampaigns />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/campaigns" element={<AdminCampaigns />} />
          <Route path="/admin/documents" element={<AdminDocuments />} />
        </Routes>
      </main>
      {!isAuthPage && !isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}
