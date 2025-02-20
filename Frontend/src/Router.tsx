import { BrowserRouter, Routes, Route } from "react-router";
import PrincipalLayout from "./Layouts/PrincipalLayout";
import Inicio from "./pages/Inicio";
import GuestLayout from "./Layouts/GuestLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UsuarioLayout from "./Layouts/UsuarioLayout";
import Usuario from "./pages/Usuario";
import Direccion from "./pages/Direccion";
import SaveAddress from "./pages/SaveAddress";
import CVLayout from "./Layouts/CVLayout";
import CV from "./pages/micvroutes/CV";
import Experiencias from "./pages/micvroutes/Experiencias";
import Titulos from "./pages/micvroutes/Titulos";
import Valores from "./pages/micvroutes/Valores";
import Hitos from "./pages/micvroutes/Hitos";
import Idiomas from "./pages/micvroutes/Idiomas";
import Notificaciones from "./pages/Notificaciones";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrincipalLayout />}>
          <Route index element={<Inicio />} />
          <Route path="notifications" element={<Notificaciones />} />
          <Route path="user" element={<UsuarioLayout />}>
            <Route index element={<Usuario />} />
            <Route path="dir" element={<Direccion />} />
            <Route path="dir/create-address" element={<SaveAddress />} />
            <Route path="dir/:id" element={<SaveAddress />} />
          </Route>
          <Route path="cv" element={<CVLayout />}>
            <Route index element={<CV />} />
            <Route path="experiences" element={<Experiencias />} />
            <Route path="titles" element={<Titulos />} />
            <Route path="values" element={<Valores />} />
            <Route path="milestones" element={<Hitos />} />
            <Route path="languages" element={<Idiomas />} />
          </Route>
        </Route>
        <Route path="auth" element={<GuestLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
