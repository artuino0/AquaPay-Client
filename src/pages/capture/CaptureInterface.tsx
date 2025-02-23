import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { dataStore } from "../../store/DataStore";
const CaptureInterface = () => {
  const navigate = useNavigate();

  const { onServiceCapture, setOnServiceCapture } = dataStore();
  const [day, setDay] = useState<number>(0);
  const { fetchData, periodBilling } = dataStore();
  useEffect(() => {
    fetchData();
    const d = new Date();
    setDay(d.getDate());
    if (window.innerWidth > 700) {
      alert("Esta seccion solo esta disponible para dispositivos moviles");
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <div
        className={
          " bg-deep-blue text-white px-3 py-3 shadow-md sticky top-0 left-0 z-10 transition-all ease-in duration-150 flex justify-between"
        }
      >
        <div>
          {onServiceCapture ? (
            <button
              className="w-[30px] mr-1"
              onClick={() => {
                navigate(-1);
                setOnServiceCapture(false);
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          ) : null}
          {onServiceCapture ? "Servicio" : "Linea de captura"}
        </div>
        <div className="capitalize text-sm flex items-center">
          {periodBilling ? periodBilling.name : "Sin Periodo"}
        </div>
      </div>
      {[29, 30, 31, 1, 2, 3, 4, 6, 15, 17, 22, 23].includes(day) &&
      periodBilling ? (
        <Outlet></Outlet>
      ) : (
        <div className="border border-yellow-500 m-6 p-3 rounded-md bg-yellow-100 text-yellow-600 text-center">
          {periodBilling
            ? "Para registrar lecturas debe encontrarse dentro del periodo establecido"
            : "No hay un periodo activo verifica el catalogo y vuelve a intentarlo"}
        </div>
      )}
    </>
  );
};

export default CaptureInterface;
