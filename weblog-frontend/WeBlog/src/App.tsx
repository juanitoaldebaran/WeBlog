import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navbar from './components/common/Navbar';
import UserPage from './pages/UserPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/route/ProtectedRoute';
import BlogDetailPage from './components/dashboard/BlogDetailPage';

function AppContent() {
  const location = useLocation();
  const hideNavbarOn = ["/auth/signup", "/auth/login"];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <AuthProvider>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/auth/signup' element={<RegisterPage />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/user' element={<UserPage />} />
        </Route>
        <Route path='/about' element={<AboutPage />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/blog/:id' element={<BlogDetailPage />} />
      </Routes>
    </AuthProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
