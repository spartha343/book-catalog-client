import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="mx-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
