import { Link, NavLink } from "react-router-dom";

function SideBar() {
  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   setTimeout(() => {
  //     toast.info("You've been logged out");
  //     dispatch(logout());
  //   }, 1000);
  // };

  return (
    <div
      id="sidebar"
      className="d-flex flex-column flex-shrink-0 p-3 text-white"
    >
      <NavLink
        to={"/"}
        end
        style={{ color: "white", textDecoration: "none" }}
        className={"d-flex align-items-center justify-content-center mt-2"}
      >
        <span className="fs-4 text-center fw-semibold company-logo">
          FERMIL SRL
        </span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto text-center">
        <li className="nav-item">
          <NavLink
            to={"/"}
            end
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-kanban"></i> Resumen
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"viajes"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-signpost-split"></i> Viajes
          </NavLink>
        </li>
        <hr />
        <li className="nav-item">
          <NavLink
            to={"vehiculos"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-truck"></i> Vehiculos
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"choferes"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-people-fill"></i> Choferes
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"consumos"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-fuel-pump"></i> Consumos
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"ordenesTaller"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-tools"></i> Ordenes de taller
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            to={"adminPanel"}
            style={{ color: "white", textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-gear-fill"></i> Admin Panel
          </NavLink>
        </li>
        <hr />
      </ul>
      <hr />

      <button className="btn btn-outline-light mt-3">Log out</button>
    </div>
  );
}

export default SideBar;
