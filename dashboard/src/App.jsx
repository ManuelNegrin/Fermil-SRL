import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import Layout from "./components/layout/Layout";
import { DashboardPage, DriversPage, FuelTicketsPage, VehiclesPage } from "./components/pages/OperationsPages";
import { ProfilePage, UserAdministrationPage } from "./components/pages/AdministrationPages";
import { TripsPage, WorkOrdersPage } from "./components/pages/TripAndWorkshopPages";

function PlatformRedirect() {
  const { logout } = useAuth();
  const url = import.meta.env.VITE_PLATFORM_CONSOLE_URL;
  if (url) { window.location.replace(url); return null; }
  return <main className="login-page"><div className="login-card shadow"><h1 className="h4">Consola de plataforma</h1><p>La cuenta es superadministradora. Configura VITE_PLATFORM_CONSOLE_URL para abrir la consola independiente.</p><button className="btn btn-outline-primary" onClick={logout}>Cerrar sesion</button></div></main>;
}

function HomePage() {
  const { hasPermission } = useAuth();
  if (hasPermission("dashboard.read")) return <DashboardPage />;
  if (hasPermission("vehicles.read")) return <Navigate to="/vehiculos" replace />;
  if (hasPermission("work_orders.read")) return <Navigate to="/taller" replace />;
  return <Navigate to="/login" replace />;
}

export default function App() {
  return <AuthProvider><Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/platform" element={<PlatformRedirect />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route element={<ProtectedRoute permission="trips.read" />}><Route path="viajes" element={<TripsPage />} /></Route>
        <Route element={<ProtectedRoute permission="vehicles.read" />}><Route path="vehiculos" element={<VehiclesPage />} /></Route>
        <Route element={<ProtectedRoute permission="drivers.read" />}><Route path="choferes" element={<DriversPage />} /></Route>
        <Route element={<ProtectedRoute permission="fuel_tickets.read" />}><Route path="combustible" element={<FuelTicketsPage />} /></Route>
        <Route element={<ProtectedRoute permission="work_orders.read" />}><Route path="taller" element={<WorkOrdersPage />} /></Route>
        <Route path="perfil" element={<ProfilePage />} />
        <Route element={<ProtectedRoute permission="users.manage" />}><Route path="admin" element={<UserAdministrationPage />} /></Route>
      </Route>
    </Route>
    <Route path="*" element={<Login />} />
  </Routes></AuthProvider>;
}
