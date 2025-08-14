import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Navbar from './components/common/Navbar'

function AppContent() {
  const location = useLocation();
  const hideNavbarOn = ["/auth/signup", "/auth/login"];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
     {!shouldHideNavbar && <Navbar />}
       <Routes>
        <Route path='/auth/signup' element={<RegisterPage />}></Route>
        <Route path='/auth/login' element={<LoginPage />}></Route>
        <Route path='/' element={<HomePage />}></Route>
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
