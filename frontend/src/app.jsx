import { BrowserRouter, Routes, Route } from "react-router";
import Videopage from "./pages/video.jsx";
import Uploadpage from "./pages/upload.jsx";
import Auth from "./pages/auth.jsx";
import { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "./context.jsx";
import { HomePage } from "./pages/home.jsx";
import { Layout } from "./layout.jsx";
import { HistoryPage } from "./pages/history.jsx";
export default function App() {
  const [isAuthenticated, setAuthenticated] = useState();

  useEffect(() => {
    getSession();
  }, []);

  async function getSession() {
    const result = await fetch("http://localhost:5000/videos/api/session", {
      credentials: "include",
    });
    const resultJson = await result.json();
    const status = resultJson.isAuthenticated;
    setAuthenticated(status === "true");
  }
  return (
    <BrowserRouter>
      <AuthContext.Provider value={[isAuthenticated, setAuthenticated]}>
        <Routes>
          <Route exact path="/:videouuid/:timestamp?" element={<Layout />}>
            <Route index element={<Videopage />} />
          </Route>

          <Route
            path="/upload"
            element={
              <Uploadpage isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />
            }
          />
          <Route
            path="/auth/:action"
            element={<Auth isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />}
          />
          <Route path="/home" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/user/history" element={<Layout />}>
            <Route index element={<HistoryPage />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
