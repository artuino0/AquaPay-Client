import { useEffect, useState } from "react";
import { IService } from "../../../../types/service.interface";
import { useNavigate } from "react-router-dom";
import requestController from "../../../../helpers/request.axios";
import DataTable from "../../../../components/DataTable";
import TablePaginator from "../../../../components/TablePaginator";
import FilterInput from "../../../../components/FilterInput";
import PageHeader from "../../../../components/PageHeader";
import { Modal } from "react-overlays";
import { RenderBD } from "../../../../components/RenderBD";
import RecordForm from "./RecordForm";

interface IServiceGetResponse {
  totalServices: number;
  totalPages: number;
  currentPage: number;
  services: IService[];
}

const ServicesList = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState<IService[]>([]);
  const [pagination, setPagination] = useState({
    totalServices: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [meterLess, setMeterLess] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const columns = [
    {
      Header: "Cliente",
      render: (row: IService) =>
        `${row.customerId.name} ${row.customerId.lastName} ${row.customerId.middleName}`,
    },
    {
      Header: "Email Cliente",
      accessor: "customerId.id",
    },
    {
      Header: "External ID",
      accessor: "customerId.externalContractId",
    },
    { Header: "No. Medidor", accessor: "meterNumber" },
    { Header: "Tipo Servicio", accessor: "serviceType" },
    {
      Header: "Dirección",
      render: (row: IService) => `${row.street} #${row.number}`,
    },
    { Header: "Creado Por", accessor: "createdBy.name" },
  ];

  const registrarLectura = (row: IService) => {
    setSelectedService(row);
    setShowModal(true);
  };

  const verDetalle = (row: IService) => {
    navigate(`/services/${row._id}`);
  };

  const actions = [
    {
      label: "Registrar lectura",
      icon: "bi bi-speedometer2",
      action: registrarLectura,
    },
    {
      label: "Ver detalle",
      icon: "bi bi-eye",
      action: verDetalle,
    },
  ];

  const fetchData = (page: number, limit: number = 10) => {
    const isHideMeterless = meterLess;
    requestController<IServiceGetResponse>({
      endpoint: "services",
      method: "GET",
      body: { page, limit, keyword, isHideMeterless },
    }).then((response) => {
      const { services, totalServices, totalPages, currentPage } = response;
      setServices(services);
      setPagination({ totalServices, totalPages, currentPage });
    });
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [limit, keyword, page, meterLess]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="bg-white border rounded-md overflow-hidden relative">
      <PageHeader title="Gestion de servicios" />
      <FilterInput
        keyword={keyword}
        setKeyword={setKeyword}
        meterless={meterLess}
        setMeterless={setMeterLess}
      />
      <DataTable data={services} columns={columns} actions={actions} />
      <TablePaginator
        currentPage={page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        limit={limit}
        setLimit={setLimit}
      />
      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <RecordForm service={selectedService!} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default ServicesList;
