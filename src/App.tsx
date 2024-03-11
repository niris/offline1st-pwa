import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import VideoPlayer from "./VideoPlayer";
import Model3DViewer from "./Model3DViewer";
import "./App.css";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<div className="content">Welcome!</div>} />
        <Route path="/video" element={<VideoPlayer />} />
        <Route path="/models" element={<Model3DViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
