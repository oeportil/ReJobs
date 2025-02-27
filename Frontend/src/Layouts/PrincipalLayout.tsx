import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import { useAuth } from "../hooks/useAuth";

const PrincipalLayout = () => {
  const { token } = useAuth({ middleware: "auth" });
  if (!token) return null;
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
