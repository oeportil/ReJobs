import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

const PrincipalLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Modal />
    </>
  );
};

export default PrincipalLayout;
