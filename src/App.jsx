import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import AddPostPage from "./pages/AddPostPage"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/addpost" element={<AddPostPage />} />
      </Routes>
    </Router>
  );
}

export default App
