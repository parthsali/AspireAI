import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import Layout from "./components/Layout"; // Import Layout
import Upload from "./pages/Upload"; // Import Pages
import CareerGuidance from "./pages/CareerGuidance";
import Login from "./pages/Login"; // Import Login page
import Home from "./pages/Home";
import Register from "./pages/Register";
import Roadmap from "./pages/Roadmap";
import MockInterview from "./pages/MockInterview";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
          <Route path="/career-guidance" element={<CareerGuidance />} />
          <Route
            path="/roadmap"
            element={
              <PrivateRoute>
                <Roadmap />
              </PrivateRoute>
            }
          />
          <Route
            path="/mock-interview"
            element={
              <PrivateRoute>
                <MockInterview />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
