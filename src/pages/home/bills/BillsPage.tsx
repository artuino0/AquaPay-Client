import { PDFViewer } from "@react-pdf/renderer";
import MyBill from "./MyBill";
import { dataStore } from "../../../store/DataStore";
import { useEffect, useState } from "react";
import { ICompany } from "../../../interfaces/company";
import requestController from "../../../helpers/request.axios";

const BillsPage = () => {
  const { periodBilling, fetchData } = dataStore();
  const [company, setCompany] = useState<ICompany>();

  useEffect(() => {
    fetchData();
    requestController<ICompany>({ endpoint: "settings", method: "GET" })
      .then((rs) => {
        setCompany(rs);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="w-full">
      {company ? (
        <PDFViewer width={"100%"} height={"500px"}>
          <MyBill company={company} />
        </PDFViewer>
      ) : null}
      <div className="border bg-white rounded-md overflow-hidden">{periodBilling?.name}</div>
    </div>
  );
};

export default BillsPage;
