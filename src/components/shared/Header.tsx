import { useState, useEffect } from "react";
import { getStringDate } from "../../helpers/date.string";
import { useLocation } from "react-router-dom";
import React from "react";
const Header = () => {
  const location = useLocation();
  const [name, setName] = useState<string>("");
  const [dateNow, setDateNow] = useState<string>("");
  useEffect(() => {
    setDateNow(getStringDate());
    const localName = window.localStorage.getItem("name");
    if (localName) {
      setName(localName);
    }
  }, []);

  const pathName = (): JSX.Element => {
    if (location.pathname === "/") return <span>Tablero</span>;
    if (location.pathname === "/records") return <span>Lecturas</span>;
    if (location.pathname === "/clients") return <span>Clientes</span>;
    if (location.pathname === "/reports") return <span>Reportes</span>;
    if (location.pathname === "/bills") return <span>Recibos</span>;
    if (location.pathname === "/payments") return <span>Pagos</span>;
    if (location.pathname === "/catalogs/users")
      return (
        <span>
          Catalagos <span className="text-deep-blue">&gt;</span> <span className="text-gray-500"> Usuarios</span>
        </span>
      );
    if (location.pathname === "/catalogs/periods")
      return (
        <span>
          Catalagos <span className="text-deep-blue">&gt;</span> <span className="text-gray-500"> Periodos</span>
        </span>
      );
    if (location.pathname === "/catalogs/clients")
      return (
        <span>
          Catalagos <span className="text-deep-blue">&gt;</span> <span className="text-gray-500"> Clientes</span>
        </span>
      );
    if (location.pathname === "/catalogs/initialize")
      return (
        <span>
          Catalagos <span className="text-deep-blue">&gt;</span> <span className="text-gray-500"> Inicializar</span>
        </span>
      );
    if (location.pathname.includes("/catalogs/services"))
      return (
        <span>
          Catalagos <span className="text-deep-blue">&gt;</span> Cliente <span className="text-deep-blue">&gt;</span> <span className="text-gray-500"> Servicios</span>
        </span>
      );
    if (location.pathname.includes("/catalogs/charges"))
      return (
        <span>
          Catalagos <span className="text-deep-blue">&gt;</span> <span className="text-gray-500"> Cargos</span>
        </span>
      );
    if (location.pathname.includes("/catalogs/tariffs"))
      return (
        <span>
          Catalagos <span className="text-deep-blue">&gt;</span>
          <span className="text-gray-500"> Tarifas</span>
        </span>
      );
    if (location.pathname.includes("/catalogs/banks"))
      return (
        <span>
          Catalagos <span className="text-deep-blue">&gt;</span> <span className="text-gray-500"> Cuentas bancarias</span>
        </span>
      );
    if (location.pathname.includes("/settings")) return <span>Ajustes generales</span>;
    return <></>;
  };

  return (
    <header className="bg-white flex items-center justify-between w-full px-6 text-sm animate__animated animate__fadeInDown animate__faster" style={{ height: "60px", minHeight: "60px" }}>
      <div className="select-none font-semibold w-[250px]">
        <React.Fragment>{pathName()}</React.Fragment>
      </div>
      <div className="select-none grow font-medium cursor-pointer flex justify-center">
        <div className="text-gray-600 border rounded-full text-xs px-4 py-1 w-fit">{dateNow}</div>
      </div>
      <div className="select-none font-semibold flex gap-4 items-center w-[250px] justify-end">
        <div className="flex h-9 w-9 rounded-full bg-deep-blue items-center justify-center text-white text-lg">{name.charAt(0)}</div>
        <div>
          <span className="text-gray-400">Hola, </span>
          {name}
        </div>
      </div>
    </header>
  );
};

export default Header;
