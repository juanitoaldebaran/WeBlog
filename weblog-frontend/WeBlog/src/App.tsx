import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <Router>
       <Routes>
        <Route path='/auth/signup' element={<RegisterPage />}></Route>
        <Route path='/auth/login' element={<LoginPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
