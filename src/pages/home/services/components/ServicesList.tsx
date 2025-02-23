import { useEffect, useState } from "react";
import { IService } from "@/types/service.interface";
import { useNavigate } from "react-router-dom";
import DataTable from "@/components/DataTable";
import TablePaginator from "@/components/TablePaginator";
import FilterInput from "@/components/FilterInput";
import PageHeader from "@/components/PageHeader";
import { Modal } from "react-overlays";
import { RenderBD } from "@/components/RenderBD";
import RecordForm from "./RecordForm";
import { useGetServices } from "@/hooks/useService";
import { Column } from "@/interfaces/columns";
import { DataTableWPagination } from "@/components/DataTableWPagination";
import { ServiceColumns } from "@/builders/columns/ServiceColumns";

interface IServiceGetResponse {
  totalServices: number;
  totalPages: number;
  currentPage: number;
  services: IService[];
}

const ServicesList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [meterless, setMeterLess] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [keyword, meterless]);

  const { data, isPending, error } = useGetServices({
    page,
    limit,
    keyword,
    meterless,
  });

  const registrarLectura = (row: IService) => {
    setSelectedService(row);
    setShowModal(true);
  };

  const verDetalle = (row: IService) => {
    navigate(`/services/${row._id}`);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="bg-white border rounded-md overflow-hidden relative">
      <PageHeader title="Gestion de servicios" />
      <FilterInput
        keyword={keyword}
        setKeyword={setKeyword}
        meterless={meterless}
        setMeterless={setMeterLess}
      />
      <DataTableWPagination
        columns={ServiceColumns}
        data={data?.data || []}
        limit={limit}
        currentPage={page}
        setLimit={setLimit}
        onPageChange={handlePageChange}
        showActions={true}
        showOpenDetail
        handleOpenDetail={verDetalle}
        showAddRecords
        handleAddRecords={registrarLectura}
      ></DataTableWPagination>
      <Modal className={"modal"} show={showModal} renderBackdrop={RenderBD}>
        <RecordForm service={selectedService!} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default ServicesList;
