import Link from "next/link";
import Anchor from "./Anchor";

const NavBar = () => {
  return (
    <>
      <header className="w-full h-[10%]">
        <nav className="w-full h-full bg-[#9A031E] flex items-center">
          <div className="w-1/6 h-full md:flex justify-center items-center pl-20 lg:pl-10 hidden">
            <span className="text-white font-bold text-3xl tracking-wider">WAVELAND</span>
          </div>
          <div className="w-full h-full flex justify-center items-center md:pr-20 md:w-5/6 md:justify-end">
            <div className="w-1/3 h-full flex justify-center items-center md:w-1/5 lg:w-[13%]">
              <Link
                href="/"
                className="text-white font-medium text-xl hover:text-2xl hover:underline transition-all"
              >
                HOME
              </Link>
            </div>
            <div className="w-1/3 h-full flex justify-center items-center md:w-1/5 lg:w-[13%]">
              <Link
                href="/history"
                className="text-white font-medium text-xl hover:text-2xl hover:underline transition-all"
              >
                HISTORY
              </Link>
            </div>
            <div className="w-1/3 h-full flex justify-center items-center md:w-1/5 lg:w-[13%]">
              <Link
                href="/ranking"
                className="text-white font-medium text-xl hover:text-2xl hover:underline transition-all"
              >
                Ranking
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
