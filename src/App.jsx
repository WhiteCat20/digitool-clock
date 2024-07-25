import { Login } from "./components/Login";
import { Capture } from "./components/Capture";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/capture" element={<Capture />} />
      </Routes>
    </Router>
  );
}

export default App;
