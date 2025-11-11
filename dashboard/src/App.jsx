import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/layout/Layout";
import Vehiculos from "./components/features/vehiculos/Vehiculos";
import AdminPanel from "./components/admin/AdminPanel";
import OrdenesTaller from "./components/features/ordenes/OrdenesTaller";
import Consumos from "./components/features/consumos/Consumos";
import Tickets from "./components/features/consumos/tickets.jsx";
import Choferes from "./components/features/choferes/Choferes";
import Viajes from "./components/features/viajes/Viajes";
import OrdenDetalle from "./components/features/ordenes/OrdenDetalle";
import TicketDetalle from "./components/features/consumos/TicketDetalle";
import ChoferEditar from "./components/features/choferes/ChoferEditar";
import VehiculoEditar from "./components/features/vehiculos/VehiculoEditar";
import ViajeEditar from "./components/features/viajes/ViajeEditar";
import NuevoViaje from "./components/forms/NuevoViajeForm";
import NuevoChofer from "./components/forms/NuevoChoferForm";
import NuevoVehiculo from "./components/forms/NuevoVehiculoForm";
import NuevoTicket from "./components/forms/NuevoTicketForm";
import NuevaOrden from "./components/forms/NuevoOrdenForm";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vehiculos" element={<Vehiculos />} />
          <Route path="vehiculos/nuevoVehiculo" element={<NuevoVehiculo />} />
          <Route path="viajes" element={<Viajes />} />
          <Route path="viajes/nuevoViaje" element={<NuevoViaje />} />
          <Route path="choferes" element={<Choferes />} />
          <Route path="choferes/nuevoChofer" element={<NuevoChofer />} />
          <Route path="consumos" element={<Consumos />} />
          <Route path="consumos/tickets" element={<Tickets />} />
          <Route path="consumos/tickets/nuevo" element={<NuevoTicket />} />
          <Route path="consumos/tickets/:id" element={<TicketDetalle />} />
          <Route path="choferes/editar/:id" element={<ChoferEditar />} />
          <Route path="vehiculos/editar/:id" element={<VehiculoEditar />} />
          <Route path="viajes/editar/:id" element={<ViajeEditar />} />
          <Route path="ordenesTaller" element={<OrdenesTaller />} />
          <Route path="ordenesTaller/nuevaOrden" element={<NuevaOrden />} />
          <Route path="ordenesTaller/:id" element={<OrdenDetalle />} />
          <Route path="adminPanel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
