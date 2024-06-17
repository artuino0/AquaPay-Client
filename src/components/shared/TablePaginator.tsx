import React from "react";

interface TablePaginatorProps {
  currentPage: number;
  totalPages: number;
  isMobile?: boolean;
  onPageChange: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
}

const TablePaginator: React.FC<TablePaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  limit,
  isMobile = false,
  setLimit,
}) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-between m-2 text-sm">
      <div>
        <select
          name="limit-page"
          id="limit"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          className="px-3 py-1 mx-1 bg-gray-200 rounded"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-[2px] bg-gray-200 rounded disabled:opacity-50"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 mx-[2px] rounded ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-[2px] bg-gray-200 rounded disabled:opacity-50"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default TablePaginator;
