import { FC } from "react";
import { Box, Container } from "@mui/material";
import styles from "./Home.module.scss";
import { Wallet } from "../../components/Wallet";
import Header from "../../components/Header";
import Splash from "./components/Splash";
import Transaction from "./components/Transaction";

/**
 * The home page
 */
const Home: FC = () => {
  return (
    <Wallet>
      <Container className="App">
        <Header />
        <Box className={styles.root}>
          <Box sx={{ width: "50%" }}>
            <Splash />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Transaction />
          </Box>
        </Box>
      </Container>
    </Wallet>
  );
};

export default Home;
