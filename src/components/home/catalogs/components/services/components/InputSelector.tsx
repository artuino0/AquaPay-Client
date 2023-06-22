import { useState, useEffect } from "react";
import { ICustomer } from "../../../../../../types/customer.interface";
import axios from "axios";
import { BASE_PATH } from "../../../../../../global.variables";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface IProps {
  setCustomerId: (newCustomerId: string) => void;
}

const InputSelector = (props: IProps) => {
  const [customers, setCustomers] = useState<ICustomer[]>();
  const Authorization = window.localStorage.getItem("token");
  const navigate = useNavigate();

  const { setCustomerId } = props;

  useEffect(() => {
    axios
      .get<ICustomer[]>(`${BASE_PATH}/customers`, { headers: { Authorization } })
      .then(({ data }) => {
        setCustomers(data);
      })
      .catch((e: AxiosError) => {
        if (e.response) {
          if (e.response.status === 401) {
            alert("Tu sesion a caducado, vuelve a iniciar sesion!");
            navigate("/login");
          }
        } else {
          alert("Servidor no disponible");
        }
      });
  }, []);

  return (
    <div className="relative text-sm text-right">
      <select onChange={(e) => setCustomerId(e.target.value)} name="" id="" className=" w-[500px] border my-2 mx-6 rounded-md px-2 py-2 outline-deep-blue">
        <option value="">Seleccione un cliente</option>
        {customers?.map((iCustomer) => (
          <option className="border-t first:border-t-0 px-6 py-2 hover:bg-gray-100" value={iCustomer.id}>
            {iCustomer.externalContractId} - {iCustomer.name} {iCustomer.lastName} {iCustomer.middleName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelector;
