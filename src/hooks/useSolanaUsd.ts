import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Load the current price of Solana for the coingecko API
 *
 * @returns the current price of Solana in USD
 */
const useSolanaUsd = () => {
  const [solanaUsd, setSolanaUsd] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    ).then((response) => {
      setIsLoading(false);
      setSolanaUsd(response.data.solana.usd);
    });
  });

  return { isLoading, solanaUsd };
};

export default useSolanaUsd;
