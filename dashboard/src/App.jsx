import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Vehiculos from "./components/Vehiculos";
import AdminPanel from "./components/AdminPanel";
import OrdenesTaller from "./components/OrdenesTaller";
import Consumos from "./components/Consumos";
import Choferes from "./components/Choferes";
import Viajes from "./components/Viajes";
import NuevoViaje from "./components/NuevoViajeForm";

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
          <Route path="adminPanel" element={<AdminPanel />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
