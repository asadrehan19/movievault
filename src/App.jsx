import { createContext, useEffect, useState } from "react";
import Header from "./Component/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./Component/Card";
import AddMovie from "./Component/addMovie";
import { Route, Routes } from "react-router-dom";
import Detail from "./Component/Details";
import Reviews from "./Component/reviews";
import SignUp from "./Component/signUp";
import Login from "./Component/login";
import "./App.css";
import { onAuthStateChanged } from "firebase/auth";

export const AppContext = createContext();

// useEffect(() => {
//   onAuthStateChanged;
// }, []);

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  const displayName = () => {};

  return (
    <>
      <AppContext.Provider value={{ login, setLogin }}>
        <Header userName={userName} />
        <Routes>
          <Route path="/" element={<Card />} />
          {<Route path="/addmovie" element={<AddMovie />} />}
          {<Route path="/moviedetail/:id" element={<Detail />} />}
          {<Route path="/signUp" element={<SignUp />} />}
          {<Route path="/login" element={<Login />} />}
          {/* {<Route path="Reviews" element={<Detail />} />} */}
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
