import { useState } from "react";
import { TextField, Typography } from "@mui/material";
// import AddPostFormData from "../../../data/add-post.json";
import { ToastContainer, toast } from "react-toastify";
import { setPosts } from "../../../redux/slices/posts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  OuterGrid,
  PaperContainer,
  InputLabelStyled,
  ButtonStyled,
} from "./styles";
import "react-toastify/dist/ReactToastify.css";
import { APPSCREENS } from "../../../constants";

function AddPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setpostData] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState([]);

  const [errorName, setErrorName] = useState("");

  const addPost = () => {
    setLoading(true);

    if (!checkValidation()) {
      setLoading(false);
      return;
    }
    setpostData({ title: "", body: "" });
    dispatch(setPosts(postData));

    setLoading(false);
    notify("success", "Post added successfully");
    setTimeout(() => {
      navigate(APPSCREENS.Home);
    }, 2000);
  };

  const checkValidation = () => {
    console.log(postData);
    if (!postData["title"]) {
      setErrorName("title");
      notify("error", "Title is required");
      return false;
    }
    if (!postData["body"]) {
      setErrorName("Description");
      notify("error", "Description is required");
      return false;
    }
    return true;
  };

  const notify = (type, message) => toast[type](message);

  const handleChange = (e) => {
    // if (errorName) {
    //   setErrorName("");
    // }
    setpostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <OuterGrid>
      <PaperContainer elevation={4}>
        <InputLabelStyled error={!"Title"}>Title</InputLabelStyled>
        <TextField
          label=""
          value={postData["title"]}
          placeholder="Enter the title"
          fullWidth
          name={"title"}
          onChange={handleChange}
        />
        <InputLabelStyled error={!"Description"}>Description</InputLabelStyled>
        <TextField
          label=""
          value={postData["body"]}
          placeholder="Enter the description"
          fullWidth
          name={"body"}
          multiline={true}
          rows={7}
          onChange={handleChange}
        />
        <ButtonStyled variant="contained" onClick={addPost} fullWidth>
          ADD POST
        </ButtonStyled>
      </PaperContainer>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </OuterGrid>
  );
}

export default AddPost;
