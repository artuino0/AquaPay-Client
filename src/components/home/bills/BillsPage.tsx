import { PDFViewer } from "@react-pdf/renderer";
import MyBill from "./MyBill";

const BillsPage = () => {
  return (
    <div className="w-full">
      <PDFViewer width={"100%"} height={"500px"}>
        <MyBill />
      </PDFViewer>
    </div>
  );
};

export default BillsPage;
