import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "../../services/api";

const statuses = {
  pending: "Pendiente",
  in_progress: "En curso",
  completed: "Completado",
  cancelled: "Cancelado",
};

const fail = (value) => toast.error(value.message || "No se pudo completar la solicitud.");
const dateTimeValue = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};
const emptyTrip = {
  trailerVehicleId: "", truckVehicleId: "", driverId: "", origin: "", destination: "",
  departureAt: "", arrivalAt: "", cargoType: "refrigerated", containerNumber: "", rotation: "", notes: "", status: "pending",
};
const emptyWorkOrder = { vehicleId: "", checkInAt: "", type: "", odometer: "", description: "" };

const useCollection = (endpoint) => {
  const [items, setItems] = useState([]);
  const refresh = useCallback(async () => {
    try { setItems(await apiFetch(endpoint)); } catch (value) { fail(value); }
  }, [endpoint]);
  useEffect(() => { refresh(); }, [refresh]);
  return { items, refresh };
};

export function TripsPage() {
  const trips = useCollection("/api/viajes");
  const vehicles = useCollection("/api/vehiculos");
  const drivers = useCollection("/api/choferes");
  const [form, setForm] = useState(emptyTrip);
  const [editing, setEditing] = useState(null);
  const [truckAssignments, setTruckAssignments] = useState({});

  const availableTrucks = useMemo(() => vehicles.items.filter((vehicle) => vehicle.type === "truck" && vehicle.status === "available"), [vehicles.items]);
  const availableTrailers = useMemo(() => vehicles.items.filter((vehicle) => vehicle.type === "trailer" && vehicle.status === "available"), [vehicles.items]);
  const activeDrivers = useMemo(() => drivers.items.filter((driver) => driver.status === "active"), [drivers.items]);
  const refresh = async () => { await Promise.all([trips.refresh(), vehicles.refresh(), drivers.refresh()]); };

  const set = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const reset = () => { setEditing(null); setForm(emptyTrip); };
  const selectOptions = (items, selectedId) => items.some((item) => item.id === selectedId) ? items : [...items, ...vehicles.items.filter((item) => item.id === selectedId)];
  const trailersForForm = selectOptions(availableTrailers, form.trailerVehicleId);
  const trucksForForm = selectOptions(availableTrucks, form.truckVehicleId);

  const prepare = () => ({
    ...form,
    truckVehicleId: form.truckVehicleId || null,
    arrivalAt: form.arrivalAt || null,
    containerNumber: form.cargoType === "container" ? form.containerNumber : null,
  });

  const submit = async (event) => {
    event.preventDefault();
    try {
      const body = prepare();
      if (editing) {
        await apiFetch(`/api/viajes/${editing.id}`, { method: "PUT", body });
        toast.success("Viaje actualizado.");
      } else {
        await apiFetch("/api/viajes", { method: "POST", body: { ...body, status: "pending" } });
        toast.success("Viaje creado.");
      }
      reset();
      refresh();
    } catch (value) { fail(value); }
  };

  const edit = (trip) => {
    setEditing(trip);
    setForm({
      trailerVehicleId: trip.trailerVehicleId || "", truckVehicleId: trip.truckVehicleId || "", driverId: trip.driverId || "",
      origin: trip.origin || "", destination: trip.destination || "", departureAt: dateTimeValue(trip.departureAt), arrivalAt: dateTimeValue(trip.arrivalAt),
      cargoType: trip.cargoType || "refrigerated", containerNumber: trip.containerNumber || "", rotation: trip.rotation || "", notes: trip.notes || "", status: trip.status,
    });
  };

  const updateTrip = async (id, body, message) => {
    try { await apiFetch(`/api/viajes/${id}`, { method: "PUT", body }); toast.success(message); refresh(); } catch (value) { fail(value); }
  };
  const assignTruck = (trip) => {
    const truckVehicleId = truckAssignments[trip.id];
    if (!truckVehicleId) return toast.error("Selecciona un camion disponible.");
    updateTrip(trip.id, { truckVehicleId }, "Camion asignado.");
  };
  const start = (trip) => {
    const truckVehicleId = trip.truckVehicleId || truckAssignments[trip.id];
    if (!truckVehicleId) return toast.error("Asigna un camion antes de iniciar el viaje.");
    updateTrip(trip.id, { truckVehicleId, status: "in_progress" }, "Viaje iniciado.");
  };
  const complete = (trip) => updateTrip(trip.id, { status: "completed", arrivalAt: new Date().toISOString() }, "Viaje completado.");
  const cancel = async (trip) => {
    if (!window.confirm(`Cancelar el viaje ${trip.origin} - ${trip.destination}?`)) return;
    try { await apiFetch(`/api/viajes/${trip.id}`, { method: "DELETE" }); toast.success("Viaje cancelado."); refresh(); } catch (value) { fail(value); }
  };

  return <>
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"><h1 className="h3 mb-0">Viajes</h1><button className="btn btn-outline-primary" onClick={refresh}>Actualizar</button></div>
    <div className="row g-4">
      <div className="col-lg-4"><form className="card card-body shadow-sm" onSubmit={submit}>
        <h2 className="h5">{editing ? "Editar viaje" : "Nuevo viaje"}</h2>
        <select className="form-select mb-2" value={form.trailerVehicleId} onChange={(event) => set("trailerVehicleId", event.target.value)} required><option value="">Remolque *</option>{trailersForForm.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.licensePlate}</option>)}</select>
        <select className="form-select mb-2" value={form.truckVehicleId} onChange={(event) => set("truckVehicleId", event.target.value)}><option value="">Camion (opcional al planificar)</option>{trucksForForm.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.licensePlate}</option>)}</select>
        <select className="form-select mb-2" value={form.driverId} onChange={(event) => set("driverId", event.target.value)} required><option value="">Chofer *</option>{activeDrivers.map((driver) => <option key={driver.id} value={driver.id}>{driver.fullName}</option>)}</select>
        <input className="form-control mb-2" placeholder="Origen" value={form.origin} onChange={(event) => set("origin", event.target.value)} required />
        <input className="form-control mb-2" placeholder="Destino" value={form.destination} onChange={(event) => set("destination", event.target.value)} required />
        <input className="form-control mb-2" type="datetime-local" value={form.departureAt} onChange={(event) => set("departureAt", event.target.value)} required />
        <select className="form-select mb-2" value={form.cargoType} onChange={(event) => set("cargoType", event.target.value)}><option value="refrigerated">Camara de frio</option><option value="container">Contenedor</option></select>
        {form.cargoType === "container" && <input className="form-control mb-2" placeholder="Numero de contenedor" value={form.containerNumber} onChange={(event) => set("containerNumber", event.target.value)} required />}
        <input className="form-control mb-2" placeholder="Virada / rotacion" value={form.rotation} onChange={(event) => set("rotation", event.target.value)} />
        <textarea className="form-control mb-2" placeholder="Notas" value={form.notes} onChange={(event) => set("notes", event.target.value)} />
        {editing && <><select className="form-select mb-2" value={form.status} onChange={(event) => set("status", event.target.value)}><option value="pending">Pendiente</option><option value="in_progress">En curso</option><option value="completed">Completado</option><option value="cancelled">Cancelado</option></select>{form.status === "completed" && <input className="form-control mb-2" type="datetime-local" value={form.arrivalAt} onChange={(event) => set("arrivalAt", event.target.value)} />}</>}
        <div className="d-flex gap-2"><button className="btn btn-primary">{editing ? "Guardar cambios" : "Crear viaje"}</button>{editing && <button type="button" className="btn btn-outline-secondary" onClick={reset}>Cancelar</button>}</div>
      </form></div>
      <div className="col-lg-8"><div className="card shadow-sm table-responsive"><table className="table mb-0"><thead><tr><th>Ruta</th><th>Recursos</th><th>Carga</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{trips.items.map((trip) => <tr key={trip.id}><td><strong>{trip.origin} - {trip.destination}</strong><br /><small>{dateTimeValue(trip.departureAt).replace("T", " ")}</small></td><td>{trip.trailer?.licensePlate || "-"}<br />{trip.truck?.licensePlate || "Sin camion"}</td><td>{trip.cargoType === "container" ? `Contenedor ${trip.containerNumber}` : "Camara de frio"}</td><td>{statuses[trip.status]}</td><td className="text-nowrap">{trip.status === "pending" && !trip.truckVehicleId && <div className="d-flex gap-1 mb-1"><select className="form-select form-select-sm" value={truckAssignments[trip.id] || ""} onChange={(event) => setTruckAssignments({ ...truckAssignments, [trip.id]: event.target.value })}><option value="">Camion</option>{availableTrucks.map((truck) => <option key={truck.id} value={truck.id}>{truck.licensePlate}</option>)}</select><button className="btn btn-sm btn-outline-primary" onClick={() => assignTruck(trip)}>Asignar</button></div>}<button className="btn btn-sm btn-outline-primary me-1 mb-1" onClick={() => edit(trip)}>Editar</button>{trip.status === "pending" && <button className="btn btn-sm btn-success me-1 mb-1" onClick={() => start(trip)}>Iniciar</button>}{trip.status === "in_progress" && <button className="btn btn-sm btn-success me-1 mb-1" onClick={() => complete(trip)}>Completar</button>}{!(["completed", "cancelled"].includes(trip.status)) && <button className="btn btn-sm btn-outline-danger mb-1" onClick={() => cancel(trip)}>Cancelar</button>}</td></tr>)}</tbody></table></div></div>
    </div>
  </>;
}

export function WorkOrdersPage() {
  const orders = useCollection("/api/ordenes-taller");
  const vehicles = useCollection("/api/vehiculos");
  const [form, setForm] = useState(emptyWorkOrder);
  const [draftStatuses, setDraftStatuses] = useState({});
  const refresh = async () => { await Promise.all([orders.refresh(), vehicles.refresh()]); };

  const submit = async (event) => {
    event.preventDefault();
    try {
      await apiFetch("/api/ordenes-taller", { method: "POST", body: { ...form, odometer: form.odometer ? Number(form.odometer) : null, status: "pending" } });
      toast.success("Orden creada. El vehiculo ahora esta En taller.");
      setForm(emptyWorkOrder);
      refresh();
    } catch (value) { fail(value); }
  };
  const updateStatus = async (order) => {
    const status = draftStatuses[order.id] || order.status;
    try {
      await apiFetch(`/api/ordenes-taller/${order.id}`, { method: "PUT", body: { status, ...(status === "completed" ? { checkOutAt: new Date().toISOString() } : {}) } });
      toast.success(status === "completed" ? "Orden completada. El vehiculo esta Disponible." : "Estado de orden actualizado.");
      refresh();
    } catch (value) { fail(value); }
  };
  const cancel = async (order) => {
    if (!window.confirm("Cancelar esta orden de taller?")) return;
    try { await apiFetch(`/api/ordenes-taller/${order.id}`, { method: "DELETE" }); toast.success("Orden cancelada."); refresh(); } catch (value) { fail(value); }
  };

  return <>
    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4"><h1 className="h3 mb-0">Ordenes de taller</h1><button className="btn btn-outline-primary" onClick={refresh}>Actualizar</button></div>
    <div className="row g-4"><div className="col-lg-4"><form className="card card-body shadow-sm" onSubmit={submit}><h2 className="h5">Nueva orden</h2><select className="form-select mb-2" value={form.vehicleId} onChange={(event) => setForm({ ...form, vehicleId: event.target.value })} required><option value="">Vehiculo *</option>{vehicles.items.filter((vehicle) => vehicle.status !== "inactive").map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.licensePlate}</option>)}</select><input className="form-control mb-2" type="datetime-local" value={form.checkInAt} onChange={(event) => setForm({ ...form, checkInAt: event.target.value })} required /><input className="form-control mb-2" placeholder="Tipo de trabajo" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} /><input className="form-control mb-2" type="number" placeholder="Odometro" value={form.odometer} onChange={(event) => setForm({ ...form, odometer: event.target.value })} /><textarea className="form-control mb-3" placeholder="Descripcion *" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required /><button className="btn btn-primary">Crear orden</button></form></div><div className="col-lg-8"><div className="card shadow-sm table-responsive"><table className="table mb-0"><thead><tr><th>Vehiculo</th><th>Ingreso</th><th>Descripcion</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{orders.items.map((order) => <tr key={order.id}><td>{order.vehicle?.licensePlate || "-"}</td><td>{dateTimeValue(order.checkInAt).replace("T", " ")}</td><td>{order.description}</td><td>{statuses[order.status]}</td><td className="text-nowrap">{!(["completed", "cancelled"].includes(order.status)) && <><select className="form-select form-select-sm d-inline-block w-auto me-1" value={draftStatuses[order.id] || order.status} onChange={(event) => setDraftStatuses({ ...draftStatuses, [order.id]: event.target.value })}><option value="pending">Pendiente</option><option value="in_progress">En curso</option><option value="completed">Completado</option></select><button className="btn btn-sm btn-success me-1" onClick={() => updateStatus(order)}>Guardar</button><button className="btn btn-sm btn-outline-danger" onClick={() => cancel(order)}>Cancelar</button></>}</td></tr>)}</tbody></table></div></div></div>
  </>;
}
