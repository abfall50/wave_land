import Head from "next/head";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Rank from "../components/Rank";

const Ranking = () => {
  return (
    <>
      <div className="w-screen h-screen bg-[#0F1A20]">
        <Header />
        <NavBar />
        <Rank />
      </div>
    </>
  );
};

export default Ranking;
