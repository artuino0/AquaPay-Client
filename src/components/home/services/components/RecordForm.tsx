import { IService } from "../../../../types/service.interface";

interface RecordFormProps {
  service: IService;
  setShowModal: (value: boolean) => void;
}

const RecordForm: React.FC<RecordFormProps> = ({ service, setShowModal }) => {
  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className=" border-b px-6 py-3 text-deep-blue">
        Registrado lectura
      </div>
      <form className="text-sm">
        <div className="px-6 pt-4">
          <p className="font-bold text-xl">
            {service.street} #{service.number}
          </p>
          <p>
            {service.customerId.name} {service.customerId.lastName}{" "}
            {service.customerId.middleName}
          </p>
        </div>
        <div className="flex flex-col gap-2 px-6 py-4">
          <div className="flex gap-2 w-full">
            <input
              className="border grow outline-deep-blue box-border px-3 py-2 rounded-md "
              placeholder="Lectura actual"
              type="number"
              id="amount"
            />
          </div>
        </div>
        <div className="border-t py-3 px-6 flex justify-end gap-2">
          <button
            type="reset"
            className="bg-red-300 text-red-600 px-6 py-2"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </button>
          <button type="submit" className="bg-deep-blue text-white px-6 py-2">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordForm;
