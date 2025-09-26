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
        <span className="fs-4 text-center fw-semibold company-logo d-none d-md-inline">
          FERMIL SRL
        </span>
        <i className="bi bi-truck fs-3 d-md-none"></i>
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
            <i className="bi bi-kanban"></i>
            <span className="d-none d-md-inline ms-2"> Resumen</span>
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
            <i className="bi bi-signpost-split"></i>
            <span className="d-none d-md-inline ms-2"> Viajes</span>
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
            <i className="bi bi-truck"></i>
            <span className="d-none d-md-inline ms-2"> Vehiculos</span>
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
            <i className="bi bi-people-fill"></i>
            <span className="d-none d-md-inline ms-2"> Choferes</span>
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
            <i className="bi bi-fuel-pump"></i>
            <span className="d-none d-md-inline ms-2"> Consumos</span>
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
            <i className="bi bi-tools"></i>
            <span className="d-none d-md-inline ms-2"> Ordenes de taller</span>
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
            <i className="bi bi-gear-fill"></i>
            <span className="d-none d-md-inline ms-2"> Admin Panel</span>
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
