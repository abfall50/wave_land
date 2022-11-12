import { useState } from "react";

const Main = (props: {
  account: string;
  connection: () => Promise<null | undefined>;
  wave: (message: string) => Promise<void>;
  count: number | undefined;
  loading: boolean
}) => {
  const { account, connection, wave, count, loading } = props;

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <main className="w-full h-[90%] flex justify-center items-center">
        <section className="w-4/5 h-[80%] flex flex-col justify-center items-cente gap-10 lg:gap-14 md:w-2/5">
          <div className="flex flex-col h-1/2 gap-6">
            <h1 className="text-4xl font-bold text-white text-center md:text-5xl">
              Welcome to WaveLand
            </h1>
            <p className="text-center text-white text-md md:text-lg">
              Hi! Connect your ethereum wallet and become the best waver! You could maybe win a little prize 😉
            </p>
            <p className="text-center text-white text-xs md:text-sm italic">
              Please wait 15 minutes after each wave
            </p>
          </div>
          <div className="w-full h-1/6 lg:h-[10%]">
            <input
              type="text"
              className="w-full h-full bg-[#D9D9D9] rounded-md outline-none text-[#0F1A20] pl-5"
              placeholder="Enter your custom message and wave!"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="w-full h-2/6 lg:h-1/6 flex justify-center items-center">
            {account ? (
              <button
                className="w-1/2 h-2/3 bg-[#9A031E] rounded-2xl hover:shadow-2xl hover:shadow-[#9A031E] opacity-100 hover:bg-[#ED7B84] transition-all duration-200 text-xl lg:text-2xl text-white flex justify-center items-center gap-4"
                onClick={() => {
                  wave(inputValue);
                  setInputValue("");
                }}
                disabled={loading ? true : false}
              >
                <span>{loading ? "Loading" : "Wave"}</span>
                <span>👋</span>
              </button>
            ) : (
              <button
                className="w-1/2 h-2/3 bg-[#9A031E] rounded-2xl hover:shadow-2xl hover:shadow-[#9A031E] opacity-100 hover:bg-[#ED7B84] transition-all duration-200 text-xl lg:text-2xl text-white flex justify-center items-center gap-4"
                onClick={connection}
              >
                <span>Connect your Wallet</span>
              </button>
            )}
          </div>
          {account ? (
            <div className="w-full h-[5%] lg:h-1/6 rounded-2xl flex flex-col justify-center items-center gap-5">
              <span className="text-xl md:text-2xl lg:text-3xl text-white text-center">
                We currently have a total of {count} waves!
              </span>
            </div>
          ) : null}
        </section>
      </main>
    </>
  );
};

export default Main;
