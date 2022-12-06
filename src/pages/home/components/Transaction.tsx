import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { clsx } from "clsx";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Input,
  Snackbar,
  Typography,
} from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import Table from "./Table";
import useSolanaUsd from "../../../hooks/useSolanaUsd";
import useSendTransaction from "../../../hooks/useSendTransaction";
import styles from "./Transaction.module.scss";
import solLogo from "../../../img/sol-logo.svg";
import solanaLogo from "../../../img/solana-logo.svg";

const LAMPORT_TO_SOL = 1000000000;

const Transaction: FC = () => {
  const [transactionBalance, setTransactionBalance] = useState<string>("0");
  const [balance, setBalance] = useState<number>();
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [snackBarSeverity, setSnackBarSeverity] =
    useState<AlertColor>("success");
  const [snackbarMessage, setSnackbarMessage] = useState<string | ReactElement>(
    ""
  );

  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { solanaUsd } = useSolanaUsd();
  const send = useSendTransaction();

  useEffect(() => {
    getBalance();
  });

  const handleClose = () => {
    setOpenSnackBar(false);
  };

  /**
   * Get the current balance of the connected wallet
   */
  const getBalance = useCallback(() => {
    if (publicKey) {
      connection
        .getBalance(publicKey)
        .then((b) => setBalance(b / LAMPORT_TO_SOL));
    }
  }, [publicKey, connection]);

  /**
   * Set the transaction balance to the max in the wallet
   */
  const onMaxButtonClick = () => {
    if (balance) {
      setTransactionBalance(balance.toString());
    }
  };

  /**
   * Disable the send button if the public key doesn't exist,
   * the transaction balance is empty or zero,
   * or the transanction balance is greater than the wallet balance
   */
  const sendDisabled = useMemo(() => {
    return (
      !publicKey ||
      transactionBalance === "" ||
      parseFloat(transactionBalance) === 0 ||
      parseFloat(transactionBalance) > balance!
    );
  }, [publicKey, transactionBalance, balance]);

  const valueToSend = useMemo(() => {
    return parseFloat(
      transactionBalance !== "" ? transactionBalance : "0"
    ).toFixed(2);
  }, [transactionBalance]);

  const valueInUsd = useMemo(() => {
    return (
      solanaUsd *
      (transactionBalance !== "" ? parseFloat(transactionBalance) : 0)
    ).toFixed(2);
  }, [solanaUsd, transactionBalance]);

  const resetTransactionBalance = useCallback(() => {
    if (transactionBalance === "") {
      setTransactionBalance("0");
    }
  }, [transactionBalance]);

  const sendTransaction = async () => {
    try {
      const { signature, confirmation } = await send(
        parseFloat(transactionBalance)
      );
      if (confirmation.value.err) {
        setSnackBarSeverity("error");
        setSnackbarMessage(confirmation.value.err as string);
      } else {
        setSnackBarSeverity("success");
        setSnackbarMessage(
          <a href={`https://solscan.io/tx/${signature}`} target="_top">
            View Transaction
          </a>
        );
        setOpenSnackBar(true);
      }
    } catch (e) {
      setSnackBarSeverity("error");
      setSnackbarMessage((e as any).toString());
    }
    getBalance();
    setTransactionBalance("0");
  };

  return (
    <Box className={styles.root}>
      <Box>
        <Box className={styles.buttons}>
          <Button
            className={clsx(styles.button, styles.selected)}
            variant="contained"
            disableElevation
          >
            Send
          </Button>
          <Button
            className={clsx(styles.button)}
            variant="contained"
            disableElevation
          >
            Receive
          </Button>
        </Box>
        <Box sx={{ textAlign: "center", padding: "24px" }}>
          <img src={solLogo} alt="sol-logo" />
        </Box>
        <Input
          className={styles.value}
          value={transactionBalance}
          onBlur={() => resetTransactionBalance()}
          onChange={(e) => setTransactionBalance(e.target.value!)}
          inputProps={{ style: { textAlign: "center" } }}
          disableUnderline
        />
        <Box className={styles.balance}>
          <Typography className={styles.currentBalance}>
            Current Balance: {balance?.toFixed(2)} SOL
          </Typography>
          <Button
            className={styles.maxButton}
            onClick={() => onMaxButtonClick()}
            variant="contained"
            disableElevation
          >
            Max
          </Button>
        </Box>
        <Box style={{ marginTop: "24px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <Box>
              <Typography className={styles.sendText}>You will send</Typography>
              <Typography className={styles.sendValue}>
                {valueToSend} (${valueInUsd})
              </Typography>
            </Box>
            <Box>
              <img src={solanaLogo} alt="solana-logo" />
            </Box>
          </Box>
          <Box>
            <Button
              disabled={sendDisabled}
              sx={{ width: "100%" }}
              variant="contained"
              disableElevation
              onClick={() => sendTransaction()}
            >
              Send SOL
            </Button>
          </Box>
          <Table
            rows={[
              {
                label: "1 SOL",
                value: `~$${solanaUsd.toString()}`,
              },
              {
                label: "Confirmation time",
                value: "~10 seconds",
              },
              {
                label: "Network fee",
                value: "0.000001 SOL",
              },
            ]}
          />
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Transaction;
