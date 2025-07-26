import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import ViewPage from "./pages/Viewpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/twitter" element={<Dashboard filterType="twitter" />} />
        <Route path="/youtube" element={<Dashboard filterType="youtube" />} />
        <Route path="/reddit" element={<Dashboard filterType="reddit" />} />
        <Route path="/view/:shareId" element={<ViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
