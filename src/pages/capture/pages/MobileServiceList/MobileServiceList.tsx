import { useState, useEffect } from "react";
import { IService, IServiceGetResponse } from "@/types/service.interface";
import requestController from "@/helpers/request.axios";
import { Link } from "react-router-dom";
import MobileFilterInput from "@/components/MobileFillterInput";
import TablePaginator from "@/components/TablePaginator";
import { useGetServices } from "@/hooks/useService";

const MobileServiceList = () => {
  const [servicesFetch, setServicesFetch] = useState<IService[]>([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    totalServices: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const { data, isPending, error } = useGetServices({
    page,
    limit,
    keyword,
    meterless: false,
    isMobile: true,
  });

  /*   useEffect(() => {
    getServices();
  }, [keyword, page, limit]); */

  /*   const getServices = async () => {
    try {
      const response = await requestController<IServiceGetResponse>({
        endpoint: "services",
        method: "GET",
        body: { page, limit, keyword, mobile: true },
      });

      if (response) {
        const { services, totalServices, totalPages, currentPage } = response;
        setServicesFetch(services);
        setPagination({ totalServices, totalPages, currentPage });
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }; */

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
        {data?.data.map((service) => (
          <li key={service._id}>
            {service.meterNumber !== "" ? (
              <Link
                to={`${service._id}`}
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
          </li>
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

export default MobileServiceList;
