// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import AuthPage from "./pages/AuthPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";

// import UserDashboard from "./pages/UserDashboard.jsx";
import Home from "./pages/Home.jsx";
import Requests from "./pages/Requests.jsx";
import AssetsLibrary from "./pages/AssetsLibrary.jsx";
import Tools from "./pages/Tools.jsx";
import SubscriptionPage from "./pages/SubscriptionPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Chat from "./pages/Chat.jsx";
import ContentCaleder from "./pages/ContentCaleder.jsx";
import { Toaster } from "react-hot-toast";
import RegionDevToggle from "./components/dev/RegionDevToggle";

const App = () => {

  return (
    <Router>
      <AuthProvider>
        {/*Global Toast system */}
        <Toaster position="bottom-right" />
        <RegionDevToggle />
        <Routes>

          {/* AUTH ROUTES — no sidebar */}
          <Route path="/auth/*" element={<AuthPage />} />
          <Route path="/" element={<Navigate to="/auth/login" replace />} />

          {/* DASHBOARD ROUTES — wrapped in ProtectedRoute + DashboardLayout */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* DEFAULT PAGE FOR /app */}
            <Route index element={<Home />} />

            {/* /app/dashboard */}
            <Route path="dashboard" element={<Home />} />

            {/* More dashboard pages (add later) */}
            <Route path="requests/*" element={<Requests />} />
            <Route path="assets" element={<AssetsLibrary />} />
            <Route path="chat" element={<Chat />} />
            <Route path="calendar" element={<ContentCaleder />} />
            <Route path="tools" element={<Tools />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>

          {/* ROOT — redirect to dashboard */}
          <Route path="/app/home" element={<Navigate to="/app/dashboard" replace />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
