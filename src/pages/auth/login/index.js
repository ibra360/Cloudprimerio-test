import {
  Input,
  FormGroup,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useState } from "react";
import FormData from "../../../data/form-data.json";
import { ToastContainer, toast } from "react-toastify";
import { setUser } from "../../../redux/slices/user";
import { useDispatch } from "react-redux";
import {
  OuterGrid,
  ChildGrid,
  Heading,
  FormControlStyled,
  FormLabelStyled,
  ButtonStyled,
} from "./styles";
import "react-toastify/dist/ReactToastify.css";
import { IMAGE_URL } from "../../../constants";
function Login() {
  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [errorName, setErrorName] = useState("");
  const [defaultImage, setDefaultImage] = useState(() => {
    return "";
  });


  const imageRef = useRef();

  const [image, setImage] = useState("");

  useEffect(() => {
    setDefaultImage(`${IMAGE_URL }`);

    if (image && typeof image !== "string") {
      const objectURL = URL.createObjectURL(image);

      setDefaultImage(objectURL);

      return () => URL.revokeObjectURL(objectURL);
    }
  }, [image]);

  const submitUserData = () => {
    if (!checkValidation()) return;
    dispatch(setUser(data));
  };

  const checkValidation = () => {
    for (let i = 0; i < FormData.length; i++) {
      const inputData = FormData[i];
      if (inputData.required && !data[inputData.key]) {
        setErrorName(inputData.label);
        notify("error", inputData.label + " is required");
        return false;
      }
    }
    return true;
  };

  const notify = (type, message) => toast[type](message);

  const handleChange = (e) => {
    if (errorName) {
      setErrorName("");
    }
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };



  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    setImage(file);

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setData({
          ...data,
          [e.target.name]: reader.result,
        });
      });
    }
  };

  const handleClick = (event) => {
    imageRef.current.click();
  };


  return (
    <OuterGrid container spacing={0}>
      <input
        type="file"
        id="uploadPic"
        name="profile_pic"
        hidden
        accept=".png, .jpg, .jpeg"
        ref={imageRef}
        onChange={handleChangeImage}
        onClick={(event) => {
          event.target.value = null;
        }}
      />

      <ChildGrid component={Paper} item elevation={6}>
        <FormGroup>
          <Box className="imageBox">
            <img
              src={image === undefined ? "img/avatar.png" : defaultImage}
              onClick={handleClick}
              className="image "
              alt="Profile Picture"
            />
          </Box>
          {FormData.map((data) => (
            <FormControlStyled key={data.key} required={data.required}>
              <FormLabelStyled
                htmlFor={data.id}
                error={data.label === errorName}
              >
                {data.type != "image" && data.label}
              </FormLabelStyled>
              {data.type === "radio" ? (
                <RadioGroup row onChange={handleChange} name={data.key}>
                  {data.options.map((option) => (
                    <FormControlLabel
                      key={option.key}
                      control={<Radio />}
                      value={option.key}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              ) : data.type != "image" ? (
                <TextField
                  id={`${data.id}`}
                  placeholder={data.placeholder}
                  type={data.type}
                  onChange={handleChange}
                  name={data.key}
                />
              ) : null}
            </FormControlStyled>
          ))}
          <ButtonStyled variant="contained" onClick={submitUserData}>
            Submit
          </ButtonStyled>
        </FormGroup>
      </ChildGrid>
      <ToastContainer
        position="top-right"
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

export default Login;
