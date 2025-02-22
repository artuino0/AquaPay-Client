import { NavLink, useNavigate } from "react-router-dom";

import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (confirm("Esta seguro que desae cerrar su sesion?")) {
      navigate("/login");
      window.localStorage.clear();
    }
  };

  return (
    <nav
      className="select-none h-full bg-white px-4 text-gray-600 font-medium animate__animated animate__fadeInLeft animate__faster"
      style={{ width: "250px" }}
    >
      <div
        className="select-none flex gap-3 items-center mb-6"
        style={{ height: "60px" }}
      >
        <img src="/logo.svg" alt="" style={{ width: "50px" }} />
        <p className="text-dark-blue font-bold italic text-xl">AquaPay</p>
      </div>
      <span className="text-xs font-medium text-gray-400 ">General</span>
      <ul className="text-sm mb-3 mt-2">
        <NavLink
          className={({ isActive }) =>
            (isActive ? "active-main" : "") + " navigation"
          }
          to={"/"}
        >
          <i className="bi bi-pie-chart"></i> Tablero
        </NavLink>
        {/* <NavLink
          className={({ isActive }) =>
            (isActive ? "active-main" : "") + " navigation"
          }
          to={"/records"}
        >
          <i className="bi bi-journal-text"></i> Lecturas
        </NavLink> */}
        <NavLink
          className={({ isActive }) =>
            (isActive ? "active-main" : "") + " navigation"
          }
          to={"/clients"}
        >
          <i className="bi bi-person"></i> Clientes
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "active" : "") + " navigation"
          }
          to={"/reports"}
        >
          <i className="bi bi-bar-chart"></i> Reportes
        </NavLink>
      </ul>
      <span className="text-xs font-medium text-gray-400">Gestion</span>
      <ul className="text-sm mb-3 mt-2">
        <NavLink
          className={({ isActive }) =>
            (isActive ? "active-main" : "") + " navigation"
          }
          to={"/services"}
        >
          <i className="bi bi-journal-text"></i> Servicios
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "active-main" : "") + " navigation"
          }
          to={"/payments"}
        >
          <i className="bi bi-cash"></i> pagos
        </NavLink>
      </ul>
      <span className="text-xs font-medium text-gray-400">Ajustes</span>
      <ul className="text-sm mb-3 mt-2">
        <NavLink
          className={({ isActive }) =>
            (isActive ? "active-main" : "") + " navigation"
          }
          to={"/catalogs"}
        >
          <i className="bi bi-database"></i> Catalagos
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            (isActive ? "active-main" : "") + " navigation"
          }
          to={"/settings"}
        >
          <i className="bi bi-gear"></i>General
        </NavLink>
        <li className={"navigation"} onClick={handleLogOut}>
          <i className="bi bi-box-arrow-in-left"></i> Salir
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
