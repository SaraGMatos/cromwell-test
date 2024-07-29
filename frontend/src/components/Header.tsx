import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Header(): JSX.Element {
  const { logOut } = useContext(AuthContext);

  return (
    <header className="h-24 border-b-slate-200 border-b-2">
      <nav className="h-full mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Cromwell</span>
            <img
              alt="Cromwell's logo - a bright orange capital C in the shape of half a nut"
              src="https://i.postimg.cc/t4P6fw7X/Cromwell-Logo.png"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex flex-wrap w-3/12 justify-between">
          <div className="lg:flex lg:gap-x-12">
            <Link
              to="/"
              className="text-xl font-semibold leading-6 text-[#ff5100]"
            >
              Home
            </Link>
          </div>
          <div className="lg:flex lg:gap-x-12">
            <Link
              to="/about"
              className="text-xl font-semibold leading-6 text-[#ff5100]"
            >
              About
            </Link>
          </div>
          <div className="lg:flex lg:gap-x-12">
            <button
              onClick={logOut}
              className="text-xl font-semibold leading-6 text-[#ff5100]"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
