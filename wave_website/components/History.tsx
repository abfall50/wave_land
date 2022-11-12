import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { findEthereumAccount } from "../pages";
import { contractABI, contractAddress } from "../utils/credentials";

declare let window: any;

const getEthereumObject = () => window.ethereum;

const HistoryComp = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState<any[]>([]);

  const getAllWaves = async () => {
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

        const waves = await wavePortalContract.getAllWaves();
        console.log("Retrieving all waves...", waves);

        let cleanWaves: any[] = [];
        waves.forEach((wave: any) => {
          cleanWaves.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });
		cleanWaves.sort((a: any, b: any) => {
			return b.timestamp - a.timestamp;
		})
        setAllWaves(cleanWaves.slice(0, 10));
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const findAccount = async () => {
      const account = await findEthereumAccount();
      if (account !== null) {
        setCurrentAccount(account);
        getAllWaves();
      }
    };

    findAccount();
    console.log(currentAccount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="w-full h-[90%] flex justify-center items-center">
        <section className="w-4/5 h-[80%] bg-[#D9D9D9] rounded-2xl flex flex-col items-center md:w-3/5 lg:w-2/5 ">
          <div className="w-full h-[15%] bg-[#9A031E] rounded-t-2xl flex justify-center items-center">
            <h1 className="text-5xl text-white text-center font-semibold">
              HISTORY
            </h1>
          </div>
          {!currentAccount ? (
            <div className="w-full h-[85%] flex justify-center items-center px-2">
              <span className="text-center text-4xl md:text-6xl text-black">
                Connect to Metamask!
              </span>
            </div>
          ) : (
            <div className="w-full h-[85%] flex flex-col items-center">
              <div
                className={
                  "w-full h-[10%] flex items-center px-2 border-b border-[#9A031E]"
                }
              >
                <div className="w-1/3 h-full flex justify-center items-center">
                  <span className="text-black text-xs md:text-sm lg:text-lg text-center truncate">
                    FROM
                  </span>
                </div>
                <div className="w-1/3 h-full flex justify-center items-center">
                  <span className="text-black text-xs md:text-sm lg:text-lg text-center truncate">
                    MESSAGE
                  </span>
                </div>
                <div className="w-1/3 h-full flex justify-center items-center">
                  <span className="text-black text-xs md:text-sm lg:text-lg text-center truncate">
                    DATE
                  </span>
                </div>
              </div>
              {allWaves.map((wave: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={
                      "w-full h-[10%] flex items-center px-2 " +
                      (index === 9 ? "" : "border-b border-[#9A031E]")
                    }
                  >
                    <div title={wave.address} className="w-1/3 h-full flex justify-center items-center">
                      <span className="text-black text-xs md:text-sm lg:text-lg text-center truncate">
                        {wave.address}
                      </span>
                    </div>
                    <div title={wave.message} className="w-1/3 h-full flex justify-center items-center">
                      <span className="text-black text-xs md:text-sm lg:text-lg text-center truncate">
                        {wave.message}
                      </span>
                    </div>
                    <div title={wave.timestamp.toString()} className="w-1/3 h-full flex justify-center items-center">
                      <span className="text-black text-xs md:text-sm lg:text-lg text-center truncate">
                        {wave.timestamp.toString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default HistoryComp;
