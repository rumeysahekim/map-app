import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListPage from "./pages/list";
import EditLocationPage from "./pages/edit-location";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/edit-location/:id" element={<EditLocationPage />} />
      </Routes>
    </Router>
  );
};

export default App; 