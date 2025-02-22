import React from "react";
import moment from "moment";
import { Column } from "../interfaces/columns";
import { Pagination } from "../interfaces/pagination";

interface DataTableProps {
  columns: Column[];
  data: any[];
  pagination?: Pagination;
  limit?: number;
  currentPage?: number;
  setLimit?: (limit: number) => void;
  onPageChange?: (page: number) => void;
  showActions: boolean;
  showEdit?: boolean;
  handleEdit?: (row: any) => void;
  showDelete?: boolean;
  handleDelete?: (row: any) => void;
  showServices?: boolean;
  handleServices?: (row: any) => void;
  onRowClick?: (row: any) => void;
}

export const DataTableWPagination: React.FC<DataTableProps> = ({
  columns,
  data,
  pagination,
  limit,
  currentPage,
  setLimit,
  onPageChange,
  showActions,
  showEdit = false,
  handleEdit,
  showDelete = false,
  handleDelete,
  showServices = false,
  handleServices,
  onRowClick,
}) => {
  const getNestedValue = (obj: any, path: string) => {
    return path
      .split(".")
      .reduce((value, key) => (value ? value[key] : undefined), obj);
  };

  const renderCellContent = (row: any, column: Column) => {
    const value = Array.isArray(column.field)
      ? column.field.map((field) => getNestedValue(row, field)).join(" ")
      : getNestedValue(row, column.field);

    switch (column.type) {
      case "text":
        return value;
      case "amount":
        return new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
        }).format(Number(value));
      case "date":
        return moment(value).format("DD/MM/YYYY");
      case "boolean":
        return value ? "Sí" : "No";
      case "status":
        const isActive = value === "activo" || value === true;
        const statusClass = isActive
          ? "text-xs px-3 bg-green-100 border-green-500 text-green-500"
          : "text-xs px-3 bg-red-100 border-red-500 text-red-500";
        return (
          <span className={`px-2 py-1 rounded-full border ${statusClass}`}>
            {isActive ? "Activo" : "Inactivo"}
          </span>
        );
      case "size":
        return value.length;
      default:
        return value;
    }
  };

  return (
    <>
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-gray-100">
            {columns.map((col, index) => (
              <th
                key={index}
                className={`py-3 px-6 border-b-1 ${"text-center"} ${
                  col.style || ""
                }`}
              >
                {col.label}
              </th>
            ))}
            {showActions && (
              <th className="py-3 px-6 text-deep-blue">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b hover:bg-gray-50 cursor-default"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`border-b px-6 py-3 ${col.align || "text-center"}`}
                >
                  {renderCellContent(row, col)}
                </td>
              ))}
              {showActions && (
                <td className="py-3 px-6 flex gap-1 justify-center text-xs">
                  {showEdit && handleEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(row);
                      }}
                      className="bg-blue-500 text-white hover:bg-blue-700 px-2 py-1 rounded"
                      title="Editar"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                  )}
                  {showServices && handleServices && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleServices(row);
                      }}
                      className="bg-green-500 text-white hover:bg-green-700 px-2 py-1 rounded"
                      title="Servicios"
                    >
                      <i className="bi bi-speedometer2"></i>
                    </button>
                  )}
                  {showDelete && handleDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row);
                      }}
                      className="bg-red-500 text-white hover:bg-red-700 px-2 py-1 rounded"
                      title="Eliminar"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between m-2 text-sm">
        {setLimit && limit && onPageChange && (
          <div>
            <select
              name="limit-page"
              id="limit"
              value={limit}
              onChange={(e) => {
                const newLimit = parseInt(e.target.value);
                setLimit(newLimit);
                onPageChange(1);
              }}
              className="px-3 py-1 mx-1 bg-gray-200 rounded outline-deep-blue"
            >
              <option value="1">1</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        )}
        {pagination && onPageChange && currentPage && (
          <div className="flex gap-2 items-center">
            <div className="bg-gray-100 px-3 py-1 rounded-md text-sm">
              {currentPage} de {pagination.totalPages}
              <span className="ml-2 font-medium">Total:</span>{" "}
              {pagination.total}
            </div>
            <div>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-[2px] bg-gray-200 rounded disabled:opacity-50"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="px-3 py-1 mx-[2px] rounded bg-blue-500 text-white">
                {currentPage}
              </button>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === pagination.totalPages}
                className="px-3 py-1 mx-[2px] bg-gray-200 rounded disabled:opacity-50"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
