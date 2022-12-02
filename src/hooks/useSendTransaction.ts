import { useCallback } from "react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

/**
 * A hook for sending transactions to the blockchain
 */
const useSendTransaction = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  /**
   * Send a specified amount of SOL to a randomly generated address
   *
   * @param sol the amount of SOL to send
   * @returns transaction confirmation
   */
  const send = useCallback(
    async (sol: number) => {
      if (!publicKey) throw new WalletNotConnectedError();

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      // 890880 lamports as of 2022-09-01
      const lamports = sol * 1000000000;

      const transaction = new Transaction({
        feePayer: publicKey,
        blockhash,
        lastValidBlockHeight,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: Keypair.generate().publicKey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });

      return await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });
    },
    [publicKey, sendTransaction, connection]
  );

  return send;
};

export default useSendTransaction;
