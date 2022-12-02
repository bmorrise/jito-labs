import logo from "../img/logo.svg";
import styles from "./Header.module.scss";
import { Box } from "@mui/material";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { publicKey } = useWallet();

  const addr = useMemo(() => {
    if (!publicKey) return null;
    return (
      publicKey.toBase58().slice(0, 4) + ".." + publicKey.toBase58().slice(-4)
    );
  }, [publicKey]);

  return (
    <Box className={styles.root} style={{ marginTop: "64px" }}>
      <img src={logo} alt="logo" width="67" height="26" />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link className={styles.home} to="/">
          Home
        </Link>
        <WalletMultiButton className={styles.connectButton}>
          {publicKey ? addr : "Connect wallet"}
        </WalletMultiButton>
      </Box>
    </Box>
  );
};

export default Header;
