import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert";
import { AppContext } from "../App";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { fireStoreInstance } from "../fireStore/fireStore";
import FirebaseApp from "../fireStore/fireStore";
import Header from "./Header";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    password: "",
    email: "",
  });
  const mainData = getAuth(FirebaseApp);
  const navigate = useNavigate();

  const { setLogin } = useContext(AppContext);

  const [sendOtp, setSendOpt] = useState(false);
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();
    setLoader(true);
    createUserWithEmailAndPassword(mainData, formData.email, formData.password);
    // setLogin(true);
    try {
      await addDoc(collection(fireStoreInstance, "userData"), {
        // name: formData.name,
        // number: formData.number,
        // password: formData.password,
        // email: formData.email,
        formData,
      });

      try {
        swal({
          title: "Registerd Successfully",
          icon: "success",
          buttons: true,
          timer: 2000,
        });
        setLogin(true);
      } catch {
        swal({
          title: "Not Registered",
          icon: "error",
          button: true,
          timer: 2000,
        });
      }
    } catch {
      swal({
        title: "Not Registered",
        icon: "error",
        button: true,
        timer: 2000,
      });
    }

    setFormData({
      name: "",
      number: "",
      password: "",
    });

    setLoader(false);
    // {  setLogin(true)}
  };

  // Create User With Email And Password

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const signUpUserWithEmailAndPassword = (e) => {
  //   e.preventDefault();
  //   createUserWithEmailAndPassword(mainData, email, formData.password);
  // };

  return (
    <>
      <div className="main">
        <h2 className="loginText"> SignUP Here</h2>

        {/* start send otp  */}
        {sendOtp ? (
          <div className="otpMain">
            <label htmlFor="Text" className="otpLable">
              Enter Otp
            </label>
            <input
              type="number"
              placeholder="Enter Otp"
              className=" otpInput"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
            <button className="otpButton">Confirm Otp</button>

            <div className="backSignUp">
              <p>
                Back to signUp page ?{" "}
                <span style={{ color: "#DC143C" }}>
                  <Link to="/signUp">Back</Link>
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="inputs">
            <label
              htmlFor="Text"
              style={{ color: "black", float: "left", fontWeight: "600" }}
            >
              Enter Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="inputFields"
              onChange={(e) => setFormData(e.target.value)}
              value={formData.name}
            />

            <label
              htmlFor="Number"
              style={{ color: "black", float: "left", fontWeight: "600" }}
            >
              Enter Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter phone number"
              className="inputFields"
              onChange={(e) => setFormData(e.target.value)}
              value={formData.number}
            />

            <label
              htmlFor="Number"
              style={{ color: "black", float: "left", fontWeight: "600" }}
            >
              Enter Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="inputFields"
              onChange={(e) => setFormData(e.target.value)}
              value={formData.email}
            />

            <label
              htmlFor="Password"
              style={{ color: "black", float: "left", fontWeight: "600" }}
            >
              Enter Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="inputFields"
              onChange={(e) => setFormData(e.target.value)}
              value={formData.password}
            />

            <button className="loginButton" onClick={createUser}>
              {loader ? <TailSpin height={25} color="white" /> : "SignUp"}
            </button>

            <div className="switchAccount">
              <p>
                I have alredy account :{" "}
                <span style={{ color: "red" }}>
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SignUp;
