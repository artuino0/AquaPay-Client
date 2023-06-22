import { useState, useEffect } from "react";
import { Modal } from "react-overlays";
import { IUser } from "../../../../../types/user.interface";
import UserForm from "./components/UserForm";
import { RenderBD } from "../../../../shared/RenderBD";
import requestController from "../../../../../helpers/request.axios";

const UserCatalog = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [updater, setUpdater] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [userSelected, setUserSelected] = useState<IUser | null>(null);

  useEffect(() => {
    requestController<IUser[]>({ endpoint: "users", method: "GET" }).then((data) => {
      setUsers(data);
    });
  }, [updater]);

  const handleOpen = (user: IUser) => {
    setUserSelected(user);
    setShowModal(true);
  };

  return (
    <div className="relative">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="py-3 px-2">Nombre:</th>
            <th className="px-2">Correo:</th>
            <th className="px-2">Telefono:</th>
            <th className="px-2">Estado:</th>
            <th className="px-2">Creado Por:</th>
            <th className="px-2 text-deep-blue">
              <i className="bi bi-three-dots-vertical"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} className="cursor-default border-b last:border-b-0 even:bg-gray-50 hover:bg-gray-100">
              <td className="px-6 py-3">{user.name}</td>
              <td className="text-center">{user.email}</td>
              <td className="text-center">{user.phone ? <a href={`tel:+52${user.phone}`}>{user.phone}</a> : "Sin registro"}</td>
              <td className="text-center">{user.active ? <span className="text-green-500">Activo</span> : <span className="text-red-500">Inactivo</span>}</td>
              <td className="text-center">{user.createdBy?.name ? user.createdBy?.name : "N/A"}</td>
              <td className="text-center flex justify-center items-center py-3 gap-6 text-base">
                <i className="bi bi-pencil-square hover:text-deep-blue cursor-pointer" onClick={() => handleOpen(user)}></i>
                <i className="bi bi-trash hover:text-red-500 cursor-pointer"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div onClick={() => setShowModal(true)} className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer">
        +
      </div>
      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <UserForm setUserSelected={setUserSelected} userSelected={userSelected} setShowModal={setShowModal} setUpdater={setUpdater} updater={updater} />
      </Modal>
    </div>
  );
};

export default UserCatalog;
