import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

function App() {

  return (
    <Router>
       <Routes>
        <Route path='/auth/signup'></Route>
      </Routes>
    </Router>
  )
}

export default App
