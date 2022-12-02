import { FC } from "react";
import { Box, Typography } from "@mui/material";
import wallet from "../../../img/wallet.svg";
import styles from "./Splash.module.scss";

/**
 * Shows the splash image and text from the home page
 */
const Splash: FC = () => {
  return (
    <Box className={styles.root}>
      <img src={wallet} alt="wallet" />
      <Typography variant="h1">
        Acme Inc. <br />
        Wallet
      </Typography>
      <Typography className={styles.subtext}>
        Send Solana to your friends!
      </Typography>
    </Box>
  );
};

export default Splash;
