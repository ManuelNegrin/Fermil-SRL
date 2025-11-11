import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-layout" style={{ minHeight: "100vh" }}>
      <div className="sidebar-wrapper d-none d-md-block">
        <SideBar expanded={true} />
      </div>
      <div className="sidebar-wrapper collapsed d-block d-md-none">
        <SideBar expanded={false} />
      </div>
      <main className="content-area d-flex justify-content-center align-items-start p-3">
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
