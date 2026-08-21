import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiFetch } from "../../services/api";

const vehicleStatusLabels = { available: "Disponible", in_trip: "En viaje", in_service: "En servicio", maintenance: "En taller", inactive: "Inactivo" };
const tripStatusLabels = { pending: "Pendiente", in_progress: "En curso", completed: "Completado", cancelled: "Cancelado" };
const emptyVehicle = { licensePlate: "", type: "truck", brand: "", model: "", status: "available" };
const displayDate = (value) => {
  const [year, month, day] = String(value || "").slice(0, 10).split("-");
  return year ? `${day}/${month}/${year}` : "-";
};
const fail = (value) => toast.error(value.message || "No se pudo completar la solicitud.");

const useVehicles = () => {
  const [items, setItems] = useState([]);
  const refresh = useCallback(async () => {
    try { setItems(await apiFetch("/api/vehiculos")); } catch (value) { fail(value); }
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return { items, refresh };
};

export function VehiclesPage() {
  const { items, refresh } = useVehicles();
  const [form, setForm] = useState(emptyVehicle);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const filteredItems = useMemo(() => items.filter((vehicle) => {
    const searchable = `${vehicle.licensePlate} ${vehicle.brand || ""} ${vehicle.model || ""}`.toLowerCase();
    return (!search || searchable.includes(search.toLowerCase()))
      && (!typeFilter || vehicle.type === typeFilter)
      && (!statusFilter || vehicle.status === statusFilter);
  }), [items, search, typeFilter, statusFilter]);
  const set = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const reset = () => { setEditing(null); setForm(emptyVehicle); };
  const edit = (vehicle) => {
    setEditing(vehicle);
    setForm({ licensePlate: vehicle.licensePlate || "", type: vehicle.type || "truck", brand: vehicle.brand || "", model: vehicle.model || "", status: vehicle.status || "available" });
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editing) { await apiFetch(`/api/vehiculos/${editing.id}`, { method: "PUT", body: form }); toast.success("Vehiculo actualizado."); }
      else { await apiFetch("/api/vehiculos", { method: "POST", body: form }); toast.success("Vehiculo creado."); }
      reset(); refresh();
    } catch (value) { fail(value); }
  };
  const deactivate = async (vehicle) => {
    if (!window.confirm(`Dar de baja el vehiculo ${vehicle.licensePlate}?`)) return;
    try { await apiFetch(`/api/vehiculos/${vehicle.id}`, { method: "DELETE" }); toast.success("Vehiculo dado de baja."); refresh(); } catch (value) { fail(value); }
  };
  return <><div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"><h1 className="h3 mb-0">Vehiculos</h1><button className="btn btn-outline-primary" onClick={refresh}>Actualizar</button></div><div className="row g-4"><div className="col-lg-4"><form className="card card-body shadow-sm" onSubmit={submit}><h2 className="h5">{editing ? "Editar vehiculo" : "Nuevo vehiculo"}</h2><input className="form-control mb-2" placeholder="Matricula *" value={form.licensePlate} onChange={(event) => set("licensePlate", event.target.value)} required /><select className="form-select mb-2" value={form.type} onChange={(event) => set("type", event.target.value)} required><option value="truck">Camion</option><option value="trailer">Remolque</option></select><input className="form-control mb-2" placeholder="Marca" value={form.brand} onChange={(event) => set("brand", event.target.value)} /><input className="form-control mb-2" placeholder="Modelo" value={form.model} onChange={(event) => set("model", event.target.value)} /><select className="form-select mb-3" value={form.status} disabled={form.status === "in_trip"} onChange={(event) => set("status", event.target.value)}>{Object.entries(vehicleStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>{form.status === "in_trip" && <div className="small text-muted mb-3">El estado En viaje solo se modifica desde el viaje.</div>}<div className="d-flex gap-2"><button className="btn btn-primary">{editing ? "Guardar cambios" : "Crear vehiculo"}</button>{editing && <button type="button" className="btn btn-outline-secondary" onClick={reset}>Cancelar</button>}</div></form></div><div className="col-lg-8"><div className="card card-body shadow-sm mb-3"><div className="row g-2"><div className="col-md-5"><input className="form-control" placeholder="Buscar por matricula, marca o modelo" value={search} onChange={(event) => setSearch(event.target.value)} /></div><div className="col-md-4"><select className="form-select" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option value="">Todos los tipos</option><option value="truck">Camiones</option><option value="trailer">Remolques</option></select></div><div className="col-md-3"><select className="form-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">Todos los estados</option>{Object.entries(vehicleStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div></div></div><div className="card shadow-sm table-responsive"><table className="table mb-0"><thead><tr><th>Matricula</th><th>Tipo</th><th>Marca / modelo</th><th>Estado</th><th>Chofer</th><th>Acciones</th></tr></thead><tbody>{filteredItems.map((vehicle) => <tr key={vehicle.id}><td>{vehicle.licensePlate}</td><td>{vehicle.type === "truck" ? "Camion" : "Remolque"}</td><td>{[vehicle.brand, vehicle.model].filter(Boolean).join(" ") || "-"}</td><td>{vehicleStatusLabels[vehicle.status] || vehicle.status}</td><td>{vehicle.currentDriver?.fullName || "-"}</td><td className="text-nowrap"><button className="btn btn-sm btn-outline-primary me-1" onClick={() => edit(vehicle)}>Editar</button>{vehicle.status !== "in_trip" && vehicle.status !== "inactive" && <button className="btn btn-sm btn-outline-danger" onClick={() => deactivate(vehicle)}>Baja</button>}</td></tr>)}{!filteredItems.length && <tr><td colSpan="6" className="text-muted">No hay vehiculos que coincidan con los filtros.</td></tr>}</tbody></table></div></div></div></>;
}

export function TripDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try { setTrip(await apiFetch(`/api/viajes/${id}`)); } catch (value) { fail(value); } finally { setLoading(false); }
  }, [id]);
  useEffect(() => { load(); }, [load]);
  if (loading) return <div className="card card-body text-muted">Cargando viaje...</div>;
  if (!trip) return <div className="card card-body"><p>El viaje no fue encontrado.</p><button className="btn btn-outline-primary align-self-start" onClick={() => navigate("/viajes")}>Volver a viajes</button></div>;
  const rows = [["Estado", tripStatusLabels[trip.status] || trip.status], ["Salida", displayDate(trip.departureAt)], ["Llegada", displayDate(trip.arrivalAt)], ["Camion", trip.truck?.licensePlate || "Sin asignar"], ["Remolque", trip.trailer?.licensePlate || "-"], ["Chofer", trip.driver?.fullName || "-"], ["Carga", trip.cargoType === "container" ? "Contenedor" : "Camara de frio"], ["Numero de contenedor", trip.containerNumber || "-"], ["Virada / rotacion", trip.rotation || "-"]];
  return <><div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"><h1 className="h3 mb-0">Detalle de viaje</h1><button className="btn btn-outline-primary" onClick={() => navigate("/viajes")}>Volver a viajes</button></div><div className="card shadow-sm"><div className="card-header"><strong>{trip.origin} - {trip.destination}</strong></div><div className="card-body"><div className="row g-3">{rows.map(([label, value]) => <div className="col-md-4" key={label}><div className="small text-muted">{label}</div><div>{value}</div></div>)}<div className="col-12"><div className="small text-muted">Notas</div><div>{trip.notes || "Sin notas."}</div></div></div></div></div></>;
}
