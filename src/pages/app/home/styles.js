import { styled, Grid, Button, Box } from "@mui/material";

export const OuterGrid = styled(Grid)(({ theme }) => ({
  // height: "93.2vh",
  // overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 0px",
  // maxWidth: 600,
  minWidth: 280,
  // width: "90%",
}));
export const ButtonStyled = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "3vh",
  textTransform: "none",
  color: "white",
  padding: "10px",
  backgroundColor: "#442445",
  borderRadius: "12px",
  minWidth: "150px",
  fontSize: "18px",
  textAlign: "center",
  cursor: "pointer",
}));
