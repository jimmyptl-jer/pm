import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QuizProvider } from "./Context/QuizContext";
import Home from "./pages/Home";
import QuizScreen from "./pages/QuizScreen";
import ResultScreen from "./pages/ResultScreen";

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizScreen />} />
          <Route path="/results" element={<ResultScreen />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
