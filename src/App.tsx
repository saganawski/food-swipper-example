import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SwipeProvider } from "./contexts/SwipeContext";
import { MatchProvider } from "./contexts/MatchContext";
import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Login } from "./pages/Login";
import { SwipePage } from "./pages/SwipePage";
import { MatchesPage } from "./pages/MatchesPage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";
import { NotFound } from "./pages/NotFound";
import InstallPrompt from "./components/pwa/InstallPrompt";
import OfflineIndicator from "./components/pwa/OfflineIndicator";

function App() {
  // Determine basename based on environment - should match vite.config.ts logic
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <MatchProvider>
          <SwipeProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<SwipePage />} />
                <Route path="matches" element={<MatchesPage />} />
                <Route path="chat/:matchId" element={<ChatPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <InstallPrompt />
            <OfflineIndicator />
          </SwipeProvider>
        </MatchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

