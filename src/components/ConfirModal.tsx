import React from "react";

interface UserDeleteProps {
  text: string;
  handleSubmit: () => void;
  handleCancel: () => void;
  children?: React.ReactNode;
  title: string;
}

const ConfirmModal: React.FC<UserDeleteProps> = ({
  handleSubmit,
  handleCancel,
  children,
  title,
}) => {
  const handleConfirm = () => {
    handleSubmit();
  };
  const handleClose = () => {
    handleCancel();
  };

  return (
    <div className="modal-container rounded-md overflow-hidden">
      <div className="border-b px-6 py-3 ">{title}</div>
      <div className="p-5">
        <div>
          <div className="px-6 py-3 ">{children}</div>
        </div>
      </div>
      <div className="border-t py-3 px-6 flex justify-end gap-2">
        <button
          type="reset"
          className="border border-deep-blue text-deep-blue px-6 py-2"
          onClick={() => {
            handleClose();
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-red-300 text-red-600 px-6 py-2 hover:bg-red-500 hover:text-white transition-all duration-300"
          onClick={handleConfirm}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
