import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/useAuth";
import { apiFetch } from "../../services/api";

const driverStatuses = { active: "Activo", inactive: "Inactivo" };
const ticketStatuses = { active: "Activo", voided: "Anulado" };
const emptyDriver = { fullName: "", document: "", phone: "", licenseExpiresAt: "", status: "active" };
const emptyTicket = { vehicleId: "", tripId: "", occurredAt: "", liters: "", totalAmount: "", supplier: "", odometer: "", notes: "" };
const fail = (value) => toast.error(value.message || "No se pudo completar la solicitud.");
const dateValue = (value) => value ? String(value).slice(0, 10) : "";
const displayDate = (value) => {
  const [year, month, day] = dateValue(value).split("-");
  return year ? `${day}/${month}/${year}` : "-";
};

const useCollection = (endpoint) => {
  const [items, setItems] = useState([]);
  const refresh = useCallback(async () => {
    try { setItems(await apiFetch(endpoint)); } catch (value) { fail(value); }
  }, [endpoint]);
  useEffect(() => { refresh(); }, [refresh]);
  return { items, refresh };
};

const DetailLayout = ({ title, backTo, children }) => {
  const navigate = useNavigate();
  return <><div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"><h1 className="h3 mb-0">{title}</h1><button className="btn btn-outline-primary" onClick={() => navigate(backTo)}>Volver al listado</button></div>{children}</>;
};

export function DriversPage() {
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const drivers = useCollection("/api/choferes");
  const [form, setForm] = useState(emptyDriver);
  const [editing, setEditing] = useState(null);
  const canCreate = hasPermission("drivers.create");
  const canUpdate = hasPermission("drivers.update");
  const canDelete = hasPermission("drivers.delete");
  const set = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const reset = () => { setEditing(null); setForm(emptyDriver); };
  const edit = (driver) => {
    setEditing(driver);
    setForm({ fullName: driver.fullName || "", document: driver.document || "", phone: driver.phone || "", licenseExpiresAt: dateValue(driver.licenseExpiresAt), status: driver.status || "active" });
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editing) { await apiFetch(`/api/choferes/${editing.id}`, { method: "PUT", body: form }); toast.success("Chofer actualizado."); }
      else { await apiFetch("/api/choferes", { method: "POST", body: form }); toast.success("Chofer creado."); }
      reset(); drivers.refresh();
    } catch (value) { fail(value); }
  };
  const remove = async (driver) => {
    if (!window.confirm(`Dar de baja a ${driver.fullName}?`)) return;
    try { await apiFetch(`/api/choferes/${driver.id}`, { method: "DELETE" }); toast.success("Chofer dado de baja."); drivers.refresh(); } catch (value) { fail(value); }
  };
  return <><div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"><h1 className="h3 mb-0">Choferes</h1><button className="btn btn-outline-primary" onClick={drivers.refresh}>Actualizar</button></div><div className="row g-4">{canCreate || editing ? <div className="col-lg-4"><form className="card card-body shadow-sm" onSubmit={submit}><h2 className="h5">{editing ? "Editar chofer" : "Nuevo chofer"}</h2><input className="form-control mb-2" placeholder="Nombre completo *" value={form.fullName} onChange={(event) => set("fullName", event.target.value)} required /><input className="form-control mb-2" placeholder="Documento *" value={form.document} onChange={(event) => set("document", event.target.value)} required /><input className="form-control mb-2" placeholder="Telefono" value={form.phone} onChange={(event) => set("phone", event.target.value)} /><input className="form-control mb-2" type="date" value={form.licenseExpiresAt} onChange={(event) => set("licenseExpiresAt", event.target.value)} /><select className="form-select mb-3" value={form.status} onChange={(event) => set("status", event.target.value)}><option value="active">Activo</option><option value="inactive">Inactivo</option></select><div className="d-flex gap-2"><button className="btn btn-primary">{editing ? "Guardar cambios" : "Crear chofer"}</button>{editing && <button type="button" className="btn btn-outline-secondary" onClick={reset}>Cancelar</button>}</div></form></div> : null}<div className={canCreate || editing ? "col-lg-8" : "col-12"}><div className="card shadow-sm table-responsive"><table className="table mb-0"><thead><tr><th>Nombre</th><th>Documento</th><th>Telefono</th><th>Libreta</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{drivers.items.map((driver) => <tr key={driver.id}><td>{driver.fullName}</td><td>{driver.document}</td><td>{driver.phone || "-"}</td><td>{displayDate(driver.licenseExpiresAt)}</td><td>{driverStatuses[driver.status] || driver.status}</td><td className="text-nowrap"><button className="btn btn-sm btn-outline-secondary me-1" onClick={() => navigate(`/choferes/${driver.id}`)}>Detalle</button>{canUpdate && <button className="btn btn-sm btn-outline-primary me-1" onClick={() => edit(driver)}>Editar</button>}{canDelete && <button className="btn btn-sm btn-outline-danger" onClick={() => remove(driver)}>Baja</button>}</td></tr>)}{!drivers.items.length && <tr><td colSpan="6" className="text-muted">No hay choferes registrados.</td></tr>}</tbody></table></div></div></div></>;
}

export function DriverDetailPage() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  useEffect(() => { apiFetch(`/api/choferes/${id}`).then(setDriver).catch(fail); }, [id]);
  if (!driver) return <div className="card card-body text-muted">Cargando chofer...</div>;
  const rows = [["Documento", driver.document], ["Telefono", driver.phone || "-"], ["Vencimiento de libreta", displayDate(driver.licenseExpiresAt)], ["Estado", driverStatuses[driver.status] || driver.status]];
  return <DetailLayout title="Detalle de chofer" backTo="/choferes"><div className="card shadow-sm"><div className="card-header"><strong>{driver.fullName}</strong></div><div className="card-body"><div className="row g-3">{rows.map(([label, value]) => <div className="col-md-4" key={label}><div className="small text-muted">{label}</div><div>{value}</div></div>)}</div></div></div></DetailLayout>;
}

export function FuelTicketsPage() {
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  const tickets = useCollection("/api/consumos");
  const vehicles = useCollection("/api/vehiculos");
  const trips = useCollection("/api/viajes");
  const [form, setForm] = useState(emptyTicket);
  const [editing, setEditing] = useState(null);
  const canCreate = hasPermission("fuel_tickets.create");
  const canUpdate = hasPermission("fuel_tickets.update");
  const refresh = async () => { await Promise.all([tickets.refresh(), vehicles.refresh(), trips.refresh()]); };
  const set = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const reset = () => { setEditing(null); setForm(emptyTicket); };
  const body = () => ({ ...form, tripId: form.tripId || null, liters: Number(form.liters), totalAmount: Number(form.totalAmount), odometer: Number(form.odometer) });
  const edit = (ticket) => {
    setEditing(ticket);
    setForm({ vehicleId: ticket.vehicleId || "", tripId: ticket.tripId || "", occurredAt: dateValue(ticket.occurredAt), liters: ticket.liters || "", totalAmount: ticket.totalAmount || "", supplier: ticket.supplier || "", odometer: ticket.odometer || "", notes: ticket.notes || "" });
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (editing) { await apiFetch(`/api/consumos/${editing.id}`, { method: "PUT", body: body() }); toast.success("Ticket actualizado."); }
      else { await apiFetch("/api/consumos", { method: "POST", body: body() }); toast.success("Ticket creado."); }
      reset(); refresh();
    } catch (value) { fail(value); }
  };
  const voidTicket = async (ticket) => {
    if (!window.confirm("Anular este ticket de combustible?")) return;
    try { await apiFetch(`/api/consumos/${ticket.id}`, { method: "DELETE" }); toast.success("Ticket anulado."); refresh(); } catch (value) { fail(value); }
  };
  return <><div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"><h1 className="h3 mb-0">Combustible</h1><button className="btn btn-outline-primary" onClick={refresh}>Actualizar</button></div><div className="row g-4">{canCreate || editing ? <div className="col-lg-4"><form className="card card-body shadow-sm" onSubmit={submit}><h2 className="h5">{editing ? "Editar ticket" : "Nuevo ticket"}</h2><select className="form-select mb-2" value={form.vehicleId} onChange={(event) => set("vehicleId", event.target.value)} required><option value="">Vehiculo *</option>{vehicles.items.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.licensePlate}</option>)}</select><select className="form-select mb-2" value={form.tripId} onChange={(event) => set("tripId", event.target.value)}><option value="">Sin viaje asociado</option>{trips.items.map((trip) => <option key={trip.id} value={trip.id}>{trip.origin} - {trip.destination}</option>)}</select><input className="form-control mb-2" type="date" value={form.occurredAt} onChange={(event) => set("occurredAt", event.target.value)} required /><input className="form-control mb-2" type="number" step="0.001" placeholder="Litros *" value={form.liters} onChange={(event) => set("liters", event.target.value)} required /><input className="form-control mb-2" type="number" step="0.01" placeholder="Importe total *" value={form.totalAmount} onChange={(event) => set("totalAmount", event.target.value)} required /><input className="form-control mb-2" placeholder="Proveedor *" value={form.supplier} onChange={(event) => set("supplier", event.target.value)} required /><input className="form-control mb-2" type="number" placeholder="Odometro *" value={form.odometer} onChange={(event) => set("odometer", event.target.value)} required /><textarea className="form-control mb-3" placeholder="Notas" value={form.notes} onChange={(event) => set("notes", event.target.value)} /><div className="d-flex gap-2"><button className="btn btn-primary">{editing ? "Guardar cambios" : "Crear ticket"}</button>{editing && <button type="button" className="btn btn-outline-secondary" onClick={reset}>Cancelar</button>}</div></form></div> : null}<div className={canCreate || editing ? "col-lg-8" : "col-12"}><div className="card shadow-sm table-responsive"><table className="table mb-0"><thead><tr><th>Vehiculo</th><th>Fecha</th><th>Litros</th><th>Importe</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{tickets.items.map((ticket) => <tr key={ticket.id}><td>{ticket.vehicle?.licensePlate || "-"}</td><td>{displayDate(ticket.occurredAt)}</td><td>{ticket.liters}</td><td>{ticket.totalAmount}</td><td>{ticketStatuses[ticket.status] || ticket.status}</td><td className="text-nowrap"><button className="btn btn-sm btn-outline-secondary me-1" onClick={() => navigate(`/combustible/${ticket.id}`)}>Detalle</button>{canUpdate && ticket.status === "active" && <><button className="btn btn-sm btn-outline-primary me-1" onClick={() => edit(ticket)}>Editar</button><button className="btn btn-sm btn-outline-danger" onClick={() => voidTicket(ticket)}>Anular</button></>}</td></tr>)}{!tickets.items.length && <tr><td colSpan="6" className="text-muted">No hay tickets de combustible registrados.</td></tr>}</tbody></table></div></div></div></>;
}

export function FuelTicketDetailPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  useEffect(() => { apiFetch(`/api/consumos/${id}`).then(setTicket).catch(fail); }, [id]);
  if (!ticket) return <div className="card card-body text-muted">Cargando ticket...</div>;
  const rows = [["Vehiculo", ticket.vehicle?.licensePlate || "-"], ["Viaje", ticket.trip ? `${ticket.trip.origin} - ${ticket.trip.destination}` : "Sin viaje asociado"], ["Fecha", displayDate(ticket.occurredAt)], ["Litros", ticket.liters], ["Importe total", ticket.totalAmount], ["Proveedor", ticket.supplier], ["Odometro", ticket.odometer], ["Estado", ticketStatuses[ticket.status] || ticket.status]];
  return <DetailLayout title="Detalle de ticket" backTo="/combustible"><div className="card shadow-sm"><div className="card-body"><div className="row g-3">{rows.map(([label, value]) => <div className="col-md-4" key={label}><div className="small text-muted">{label}</div><div>{value}</div></div>)}<div className="col-12"><div className="small text-muted">Notas</div><div>{ticket.notes || "Sin notas."}</div></div></div></div></div></DetailLayout>;
}
