import Header from "../components/Header";
import NavBar from "../components/NavBar";
import HistoryComp from "../components/History";

const History = () => {
  return (
    <>
      <div className="w-screen h-screen bg-[#0F1A20]">
        <Header />
        <NavBar />
        <HistoryComp />
      </div>
    </>
  );
};

export default History;
