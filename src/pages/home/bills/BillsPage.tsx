import { PDFViewer } from "@react-pdf/renderer";
import MyBill from "./MyBill";
import { dataStore } from "../../../store/DataStore";
import { useEffect, useState } from "react";
import { ICompany } from "../../../interfaces/company";
import requestController from "../../../helpers/request.axios";
import { useGetCompanySettings } from "@/hooks/useCompany";

const BillsPage = () => {
  const { periodBilling, fetchData } = dataStore();
  const [company, setCompany] = useState<ICompany>();

  const { data, isPending } = useGetCompanySettings();

  /*   useEffect(() => {
    fetchData();
    requestController<ICompany>({ endpoint: "settings", method: "GET" })
      .then((rs) => {
        setCompany(rs);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []); */
  return (
    <div className="w-full">
      {data ? (
        <PDFViewer width={"100%"} height={"1000px"}>
          <MyBill company={data!} />
        </PDFViewer>
      ) : null}
      <div className="border bg-white rounded-md overflow-hidden">
        {periodBilling?.name}
      </div>
    </div>
  );
};

export default BillsPage;
