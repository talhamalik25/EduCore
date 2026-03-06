import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPagePureTailwind from './Components/LandingPagePureTailwind';
import TeacherDashboard from './Components/TeacherDashboard';
import PrincipalDashboard from './Components/PrincipleDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPagePureTailwind />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/principal" element={<PrincipalDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
