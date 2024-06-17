import { useState } from "react";
import {
  IService,
  IServiceGetResponse,
} from "../../../../types/service.interface";
import { useEffect } from "react";
import requestController from "../../../../helpers/request.axios";
import { Link } from "react-router-dom";
import MobileFilterInput from "../../../shared/MobileFillterInput";
import TablePaginator from "../../../shared/TablePaginator";

const ServicesList = () => {
  const [servicesFetch, setServicesFetch] = useState<IService[]>();
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [pagination, setPagination] = useState({
    totalServices: 0,
    totalPages: 0,
    currentPage: 1,
  });

  useEffect(() => {
    getServices();
  }, [keyword, page, limit]);

  const getServices = () => {
    requestController<IServiceGetResponse>({
      endpoint: "services",
      method: "GET",
      body: { page, limit, keyword, mobile: true },
    }).then((response) => {
      const { services, totalServices, totalPages, currentPage } = response;
      setServicesFetch(services);
      console.log(servicesFetch);
      setPagination({ totalServices, totalPages, currentPage });
    });
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [limit]);

  return (
    <div className="">
      <h1 className="text-xl font-bold bg-gray-100 px-2 py-3 border">
        Lista de servicios
      </h1>

      <MobileFilterInput
        keyword={keyword}
        setKeyword={setKeyword}
        placeholder="Buscar servicio"
      />
      <ul className="text-sm">
        {servicesFetch?.map((service) => (
          <div key={service._id}>
            {service.meterNumber !== "" ? (
              <Link
                to={`${service._id}`}
                key={service._id}
                className="flex items-center justify-between border border-t-0 px-2 py-2 leading-tight even:bg-gray-50"
              >
                <div>
                  <span>
                    {service.street} #{service.number}
                  </span>
                  <br />
                  <small className="text-gray-400">
                    {service.customerId.externalContractId} -{" "}
                    {service.customerId.name} {service.customerId.lastName}{" "}
                    {service.customerId.middleName}
                  </small>
                </div>
                <i className="bi bi-chevron-right"></i>
              </Link>
            ) : null}
          </div>
        ))}
      </ul>
      <TablePaginator
        currentPage={page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        limit={limit}
        setLimit={setLimit}
        isMobile={true}
      />
    </div>
  );
};

export default ServicesList;
