interface ModalBuilderProps {
  modalTitle: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ModalBuilder = () => {
  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className=" border-b px-6 py-3 text-deep-blue">
        Creando nuevo cargo
      </div>

      <form className="text-sm">
        <div className="flex flex-col gap-2 px-6 py-6">
          <div className="flex gap-2 w-full">
            <input
              className="border grow outline-deep-blue box-border px-3 py-2 rounded-md "
              placeholder="Descripcion del cargo"
              type="text"
              id="name"
            />
            <input
              className="border grow outline-deep-blue box-border px-3 py-2 rounded-md "
              placeholder="Monto en MXN"
              type="number"
              id="amount"
            />
          </div>
        </div>
        <div className="border-t py-3 px-6 flex justify-end gap-2">
          <button type="reset" className="bg-red-300 text-red-600 px-6 py-2">
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

export default ModalBuilder;
