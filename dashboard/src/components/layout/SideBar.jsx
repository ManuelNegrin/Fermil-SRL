import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SideBar({ expanded = true }) {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

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
        {expanded ? (
          <span className="fs-4 text-center fw-semibold company-logo d-none d-md-inline">
            FERMIL SRL
          </span>
        ) : (
          <span className="fs-4 text-center fw-semibold company-logo d-md-none">
            F
          </span>
        )}
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
            {expanded && (
              <span className="d-none d-md-inline ms-2"> Resumen</span>
            )}
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
            {expanded && (
              <span className="d-none d-md-inline ms-2"> Viajes</span>
            )}
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
            {expanded && (
              <span className="d-none d-md-inline ms-2"> Vehiculos</span>
            )}
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
            {expanded && (
              <span className="d-none d-md-inline ms-2"> Choferes</span>
            )}
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
            {expanded && (
              <span className="d-none d-md-inline ms-2"> Consumos</span>
            )}
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
            {expanded && (
              <span className="d-none d-md-inline ms-2">
                {" "}
                Ordenes de taller
              </span>
            )}
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
            {expanded && (
              <span className="d-none d-md-inline ms-2"> Admin Panel</span>
            )}
          </NavLink>
        </li>
        <hr />
      </ul>
      <hr />

      <button className="btn btn-outline-light mt-3" onClick={handleAuthClick}>
        {user ? "Log out" : "Log in"}
      </button>
    </div>
  );
}

export default SideBar;
