import { Outlet } from "react-router-dom";
import CatalogsNavbar from "./navbar/CatalogsNavbar";

const CatalogsPage = () => {
  return (
    <div className="bg-white border rounded-md overflow-auto relative">
      <CatalogsNavbar />
      <div className="static overflow-y-scroll" style={{ maxHeight: "calc( 100vh - ( 60px + 6.4rem ) )" }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default CatalogsPage;
