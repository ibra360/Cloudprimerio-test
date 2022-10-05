import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Home, AddPost } from "../../pages/app";
import { withRouter } from "../../utils/withRouter";
import { APPSCREENS } from "../../constants";
import { Fab } from "@mui/material";
import { AppBar } from "../../components";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { OuterGrid, ButtonStyled } from "./styles";

const AppFlowRoutes = () => {
 
  return (
    <OuterGrid container spacing={0}>
     
      <Routes>
        <Route path={APPSCREENS.Home} element={<Home />} />
        <Route path={APPSCREENS.AddPost} element={<AddPost />} />
        <Route path="*" element={<Navigate to={APPSCREENS.Home} replace />} />
      </Routes>

    </OuterGrid>
  );
};

export default withRouter(AppFlowRoutes);
