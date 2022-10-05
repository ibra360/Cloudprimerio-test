import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user";

import { clearPosts } from "../../redux/slices/posts";
import { AppBarAvatar } from "./styles";
import { useLocation } from "react-router";
import { getObjByKey } from "./../../utils/methods";
import { URL_NAMES } from "./../../constants";
import { useNavigate } from "react-router-dom";

function AppBarComp() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  let navigate = useNavigate();
  const Logout = () => {
    dispatch(clearPosts());
    dispatch(setUser(null));
  };
  return (
    <AppBar position="static">
      <Toolbar className="d-flex">
        <AppBarAvatar
          alt="user pic"
          src={user?.profile_pic}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography> */}
        <Typography variant="h6">
          {getObjByKey(URL_NAMES, location?.pathname)}
        </Typography>
        <Button color="inherit" onClick={Logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComp;
