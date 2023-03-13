import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttemptQuiz from "./pages/AttemptQuiz";
import CreateQuiz from "./pages/CreateQuiz";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="create/:id" element={<CreateQuiz />} />
        <Route path="attempt" element={<AttemptQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
