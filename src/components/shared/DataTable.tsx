type Column<T> = {
  Header: string;
  accessor?: string;
  render?: (row: T) => React.ReactNode;
};

type Action<T> = {
  label: string;
  icon: string;
  action: (row: T) => void;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
};

const getNestedValue = (obj: Record<string, any>, path?: string) => {
  return path
    ? path.split(".").reduce((acc, part) => acc && acc[part], obj)
    : null;
};

const formatField = (field: string, value: any) => {
  if (field === "serviceType") {
    return serviceTypeModifier(value);
  }
  return value;
};

const serviceTypeModifier = (value: string) => {
  switch (value) {
    case "domestic":
      return "Doméstico";
    case "commercial":
      return "Comercial";
    case "mixed":
      return "Mixto";
    default:
      return value;
  }
};

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  actions,
}: DataTableProps<T>) => {
  return (
    <table className="w-full text-sm">
      <thead className="sticky top-0">
        <tr className="border-b border-t bg-gray-100">
          {columns.map((col, index) => (
            <th className="py-3 px-2 w-fit" key={index}>
              {col.Header}
            </th>
          ))}
          {actions && actions.length > 0 && (
            <th className="px-2 text-deep-blue">
              <i className="bi bi-three-dots-vertical"></i>
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="cursor-default border-b even:bg-gray-50 hover:bg-gray-100 text-sm"
          >
            {columns.map((col, colIndex) => (
              <td key={colIndex} className="px-6 py-3 text-center w-fit">
                {col.render
                  ? col.render(row)
                  : String(
                      formatField(
                        col.accessor || "",
                        getNestedValue(row, col.accessor)
                      )
                    )}
              </td>
            ))}
            {actions && (
              <td className="px-6 py-3 text-center w-fit">
                {actions.map((action, actionIndex) => (
                  <i
                    key={actionIndex}
                    className={`${action.icon} hover:text-deep-blue cursor-pointer mx-1`}
                    onClick={() => action.action(row)}
                  ></i>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
