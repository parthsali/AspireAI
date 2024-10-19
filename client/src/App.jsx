import { Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Upload />} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>
  );
};

export default App;
