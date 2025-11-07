import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/layout/Layout";
import Vehiculos from "./components/features/vehiculos/Vehiculos";
import AdminPanel from "./components/admin/AdminPanel";
import OrdenesTaller from "./components/features/ordenes/OrdenesTaller";
import Consumos from "./components/features/consumos/Consumos";
import Choferes from "./components/features/choferes/Choferes";
import Viajes from "./components/features/viajes/Viajes";
import NuevoViaje from "./components/forms/NuevoViajeForm";
import OrdenDetalle from "./components/features/ordenes/OrdenDetalle";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vehiculos" element={<Vehiculos />} />
          <Route path="viajes" element={<Viajes />} />
          <Route path="viajes/nuevoViaje" element={<NuevoViaje />} />
          <Route path="choferes" element={<Choferes />} />
          <Route path="consumos" element={<Consumos />} />
          <Route path="ordenesTaller" element={<OrdenesTaller />} />
          <Route path="ordenesTaller/:id" element={<OrdenDetalle />} />
          <Route path="adminPanel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
