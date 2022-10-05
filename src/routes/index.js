import { BrowserRouter } from "react-router-dom";
import AppFlowRoutes from "./app";
import AuthFlowRoutes from "./auth";
import { useSelector } from "react-redux";
import { AppBar } from "../components";

const Routes = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <AppBar />

      {user ? <AppFlowRoutes /> : <AuthFlowRoutes />}
    </BrowserRouter>
  );
};

export default Routes;
