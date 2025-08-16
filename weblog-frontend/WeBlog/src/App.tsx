import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Navbar from './components/common/Navbar'
import UserPage from './pages/UserPage'
import AboutPage from './pages/AboutPage'

function AppContent() {
  const location = useLocation();
  const hideNavbarOn = ["/auth/signup", "/auth/login", "/user"];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
     {!shouldHideNavbar && <Navbar />}
       <Routes>
        <Route path='/auth/signup' element={<RegisterPage />} />
        <Route path='/auth/login' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
export default App;
