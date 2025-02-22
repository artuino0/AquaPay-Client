import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
const HomePage = () => {
  return (
    <div className="flex h-screen ">
      <Navbar />
      <div className="grow flex flex-col relative">
        <Header />
        <div className="p-4 animate__animated animate__fadeIn animate__delay-1s flex-grow max-h-full overflow-hidden mb-4 mr-4 bg-home">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
