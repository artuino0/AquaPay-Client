import { NavLink } from "react-router-dom";

import "./catalogs-navbar.css";

const CatalogsNavbar = () => {
  return (
    <div className="border-b pt-3 px-3 catalog-navbar text-sm">
      <ul>
        <NavLink className={({ isActive }) => (isActive ? "active" : "") + " navigation"} to={"users"}>
          Usuarios
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "") + " navigation"} to={"clients"}>
          Clientes
        </NavLink>
        {/* <NavLink className={({ isActive }) => (isActive ? "active" : "") + " navigation"} to={"services"}>
          Servicios
        </NavLink> */}
        <NavLink className={({ isActive }) => (isActive ? "active" : "") + " navigation"} to={"charges"}>
          Cargos
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "") + " navigation"} to={"tariffs"}>
          Tarifas
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "") + " navigation"} to={"periods"}>
          Periodos
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? "active" : "") + " navigation"} to={"banks"}>
          Cuentas bancarias
        </NavLink>
      </ul>
    </div>
  );
};

export default CatalogsNavbar;
