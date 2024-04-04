import { Link, useNavigate } from "react-router-dom";
import "./login.css";
const Login = () => {
  const navigate = useNavigate("");
  return (
    <>
      <div className="main">
        <h2 className="loginText">Login Here</h2>

        <div className="inputs">
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
          />

          <button className="loginButton">Login </button>

          <div className="switchAccount">
            <p>
              Did not have account :{" "}
              <span style={{ color: "red" }}>
                <Link to="/signUp">SignUp</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
