import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { findEthereumAccount } from "../pages";
import { contractABI, contractAddress } from "../utils/credentials";
import abi from "../utils/WavePortal.json";

declare let window: any;

const getEthereumObject = () => window.ethereum;

const Rank = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [ranking, setRanking] = useState<any>([])

  const getAllUsers = async () => {
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

		const users = await wavePortalContract.getAllUsers();
		console.log("Retrieving all users...", users);

		const map = await Promise.all(users.map(async (user: any) => {
			const numberOfWave = await wavePortalContract.getTotalWavesByAddress(user.addressOfUser);
			return {address: user.addressOfUser, number: numberOfWave.toNumber()};
		}))

		map.sort((a: any, b: any) => b.number - a.number)
		setRanking(map.slice(0, 10))
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
		getAllUsers();
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
              RANKING
            </h1>
          </div>
          {!currentAccount ? (
            <div className="w-full h-[85%] flex justify-center items-center px-2">
              <span className="text-center text-4xl md:text-6xl text-black">Connect to Metamask!</span>
            </div>
          ) : (
            <div className="w-full h-[85%] flex flex-col items-center">
				{ranking.map((ranker: any, index: number) => {
					return (
						<div key={index} className={"w-full h-[10%] flex items-center " + (index === 9 ? "" : "border-b border-[#9A031E]")}>
							<div className="w-1/6 h-full flex justify-center items-center">
								<span className="text-black text-xl lg:text-2xl text-center">{index + 1} #</span>
							</div>
							<div className="w-5/6 h-full flex justify-center items-center">
								<span className="text-black text-xs md:text-sm lg:text-lg text-center truncate">{ranker.address}</span>
							</div>
						</div>
					)
				})}
			</div>
          )}
        </section>
      </main>
    </>
  );
};

export default Rank;
