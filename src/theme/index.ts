import { createTheme } from "@mui/material";

export default createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "40px",
          backgroundColor: "#B96BFC",
          fontSize: "16px",
          textTransform: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "NeueMontreal",
        },
      },
    },
  },
});
