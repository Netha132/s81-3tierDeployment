import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import News from "./components/News";
import Tools from "./components/Tools";
import Support from "./components/Support";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import DeleteProfile from "./components/DeleteProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/tools" element={<Tools />}></Route>
          <Route path="/support" element={<Support />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
          <Route path="/deleteprofile" element={<DeleteProfile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
