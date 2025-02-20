import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrincipalLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PrincipalLayout;
