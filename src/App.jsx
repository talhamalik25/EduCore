import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/Landing/LandingPage';
import TeacherDashboard from './Components/TeacherDashboard';
import PrincipalDashboard from './Components/PrincipleDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/principal" element={<PrincipalDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
