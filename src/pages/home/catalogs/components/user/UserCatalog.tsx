import { useState } from "react";
import { Modal } from "react-overlays";
import { IUser } from "@/types/user.interface";
import UserForm from "./components/UserForm";
import { RenderBD } from "@/components/RenderBD";
import { DataTableWPagination } from "@/components/DataTableWPagination";
import UserDelete from "./components/UserDelete";
import { useDeleteUser, useGetUsers } from "@/hooks/useUsers";
import { UserColumns } from "@/builders/columns/UserColumns";
import { useToastStore } from "@/stores/toastStore";

const UserCatalog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [userSelected, setUserSelected] = useState<IUser | null>(null);

  const [showDeleted, setShowDeleted] = useState(false);

  const { data, error, isPending } = useGetUsers(
    currentPage,
    limit,
    showDeleted
  );

  const deleteUserMutation = useDeleteUser();

  /* useEffect(() => {
    requestController<IUserRequest>({
      endpoint: "users",
      method: "GET",
      queries: { page: currentPage, limit, showDeleted: !showDeleted },
    }).then((response) => {
      setUsers(response.data);
      setPagination(response.pagination);
    });
  }, [updater, limit, currentPage, showDeleted]); */

  const handleEdit = (user: IUser) => {
    setUserSelected(user);
    setShowModal(true);
  };
  const handleDelete = (user: IUser) => {
    setUserSelected(user);
    setShowModalDelete(true);
  };

  const handleSubmit = () => {
    setShowModalDelete(false);
    setUserSelected(null);
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    deleteUserMutation.mutate(userSelected!.id);
    setShowModalDelete(false);
  };

  return (
    <div className="relative">
      <div className="p-3 flex justify-end">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showDeleted}
            onChange={() => setShowDeleted(!showDeleted)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-blue-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium">Ocultar inactivos</span>
        </label>
      </div>
      <DataTableWPagination
        columns={UserColumns}
        data={data?.data || []}
        pagination={data?.pagination}
        limit={limit}
        currentPage={currentPage}
        setLimit={setLimit}
        onPageChange={setCurrentPage}
        showActions={true}
        showEdit={true}
        handleEdit={handleEdit}
        showDelete={true}
        handleDelete={handleDelete}
        onRowClick={(user) => console.log("Fila clickeada:", user)}
      />
      <div
        onClick={() => setShowModal(true)}
        className="add fixed bottom-3 right-3 w-14 h-14 bg-deep-blue flex items-center justify-center text-2xl rounded-full text-white cursor-pointer"
      >
        +
      </div>
      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <UserForm
          setUserSelected={setUserSelected}
          userSelected={userSelected}
          setShowModal={setShowModal}
        />
      </Modal>
      <Modal
        className={"modal"}
        show={showModalDelete}
        renderBackdrop={RenderBD}
      >
        <UserDelete
          text={`Eliminando usuario ${userSelected?.name}`}
          handleSubmit={handleConfirmDelete}
          handleCancel={() => setShowModalDelete(false)}
        >
          <p>
            Estas a punto de eliminar el usuario{" "}
            <span className="font-semibold">{userSelected?.name}</span>, este
            proceso es irreversible. <br /> <br />
            ¿Estás seguro de que deseas continuar?
          </p>
        </UserDelete>
      </Modal>
    </div>
  );
};

export default UserCatalog;
