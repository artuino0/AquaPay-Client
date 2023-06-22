const BankAccount = () => {
  return (
    <div className="relative">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-2">Banco:</th>
            <th className="px-2">Cuenta:</th>
            <th className="px-2">Fecha de alta:</th>
            <th className="px-2">Creado Por:</th>
            <th className="px-2 text-deep-blue">
              <i className="bi bi-three-dots-vertical"></i>
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default BankAccount;
