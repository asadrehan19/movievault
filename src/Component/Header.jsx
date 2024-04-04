import React, { useContext } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import Login from "./login";
// import "./header.css";
function Header({ userName }) {
  const useLoginContext = useContext(AppContext);

  return (
    <div className="container flex min-w-full sticky top-0 z-10 justify-between border-b-1 bg-slate-800 border-grey">
      <Link to="/">
        <div className="text-3xl overflow-hidden min-h-31.5 mt-2">
          <span className="text-[crimson] cursor-pointer">Movie</span>
          <span className="text-[white] cursor-pointer">Vault</span>
        </div>
      </Link>

      {/* <div className="flex mt-2 @media (min-width: 390px) { display: none }">
        <ul className="flex mr-20 gap-x-20 ">
          <li className="text-[white] cursor-pointer">Home</li>
          <li className="text-[white] cursor-pointer">Contact</li>
          <li className="text-[white] cursor-pointer hover:color-crimson-700">
            Gallery
          </li>
        </ul>
      </div> */}

      {useLoginContext.login ? (
        <Link to="/addmovie">
          <div className="addbutton text-[white] flex mt-2">
            <button className="btn btn-danger flex">
              <IoMdAdd className="mt-2 " /> <span>Add Movie</span>
            </button>
          </div>
        </Link>
      ) : (
        <Link to="/login">
          <div className="addbutton text-[white] flex mt-2">
            <button className="btn btn-danger flex ">
              <span>Login</span>
            </button>
          </div>
        </Link>
      )}
    </div>
  );
}

export default Header;
