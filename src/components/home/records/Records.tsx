import { useEffect, useState } from "react";
import { IService } from "../../../types/service.interface";
import requestController from "../../../helpers/request.axios";
import DataTable from "../../shared/DataTable";
import TablePaginator from "../../shared/TablePaginator";
import FilterInput from "../../shared/FilterInput";
import PageHeader from "../../shared/PageHeader";

interface IServiceGetResponse {
  totalServices: number;
  totalPages: number;
  currentPage: number;
  services: IService[];
}

const Records = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [pagination, setPagination] = useState({
    totalServices: 0,
    totalPages: 0,
    currentPage: 1,
  });
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const columns = [
    {
      Header: "Cliente",
      render: (row: IService) =>
        `${row.customerId.name} ${row.customerId.lastName} ${row.customerId.middleName}`,
    },
    { Header: "No. Medidor", accessor: "meterNumber" },
    { Header: "Tipo Servicio", accessor: "serviceType" },
    {
      Header: "Dirección",
      render: (row: IService) => `${row.street} ${row.number}`,
    },
    { Header: "Creado Por", accessor: "createdBy.name" },
  ];

  const actions = [
    {
      label: "Editar",
      icon: "bi bi-pencil",
      action: (row: IService) => {
        console.log("Editar", row);
      },
    },
  ];

  const fetchData = (page: number, limit: number = 10) => {
    requestController<IServiceGetResponse>({
      endpoint: "services",
      method: "GET",
      body: { page, limit, keyword },
    }).then((response) => {
      const { services, totalServices, totalPages, currentPage } = response;
      setServices(services);
      setPagination({ totalServices, totalPages, currentPage });
    });
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [limit, keyword, page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="bg-white border rounded-md overflow-hidden relative">
      <PageHeader title="Registro de lecturas" />
      <FilterInput keyword={keyword} setKeyword={setKeyword} />
      <DataTable data={services} columns={columns} actions={actions} />
      <TablePaginator
        currentPage={page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        limit={limit}
        setLimit={setLimit}
      />
    </div>
  );
};

export default Records;
