import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <Router>
       <Routes>
        <Route path='/auth/signup' element={<RegisterPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
