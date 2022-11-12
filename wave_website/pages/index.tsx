import NavBar from "../components/NavBar";
import Main from "../components/Main";
import Header from "../components/Header";
import { SyntheticEvent, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";
import { contractABI, contractAddress } from "../utils/credentials";
import Alert, { AlertColor } from "@mui/material/Alert";
import AlertComp from "../components/Alert";

declare let window: any;

const getEthereumObject = () => window.ethereum;

export const findEthereumAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return null;
    }

    console.log("We have the ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getTotalWaves = async () => {
  try {
    const ethereum = getEthereumObject();

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const count = await wavePortalContract.getTotalWaves();
      console.log("Retrieve total wave count...", count.toNumber());

      return count;
    } else {
      return -1;
    }
  } catch (error) {
    console.error(error);
    return -1;
  }
};

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [count, setCount] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [alerter, setAlerter] = useState<{
    message: string;
    type: AlertColor | undefined;
  }>({ message: "", type: "success" });

  const handleClose = (e: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const changeOpen = () => {
    setOpen(true);
  };

  const connectWallet = async () => {
    try {
      const ethereum = await getEthereumObject();

      if (!ethereum) {
        alert("Get Metamask!");
        return null;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected to ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("error");
    }
  };

  const wave = async (message: string) => {
    if (message === "") return;
    try {
      const ethereum = getEthereumObject();

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setLoading(true);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieve total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mining --", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieve total wave count...", count.toNumber());
        if (count) setCount(count.toNumber());
        setLoading(false);
        changeOpen();
        setAlerter({
          message: "You waved at me successfully!",
          type: "success",
        });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      setLoading(false);
      changeOpen();
      setAlerter({ message: "A problem occured!", type: "error" });
      console.error(error);
    }
  };

  useEffect(() => {
    const findAccount = async () => {
      const account = await findEthereumAccount();
      if (account !== null) {
        setCurrentAccount(account);
        const count = await getTotalWaves();
        if (count) setCount(count.toNumber());
      }
    };

    findAccount();
    console.log(currentAccount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-screen h-screen bg-[#0F1A20]">
      <Header />
      <NavBar />
      <Main
        account={currentAccount}
        connection={connectWallet}
        wave={wave}
        count={count}
        loading={loading}
      />
      <AlertComp open={open} alerter={alerter} handleClose={handleClose} />
    </div>
  );
};

export default Home;
