import AuthLayout from "../../componants/layouts/AuthLayout ";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import Input from "../../componants/inputs/Input";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/paths";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  async function onSubmit(e) {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { accessToken, ...userData } = response.data;

      if (accessToken) {
        localStorage.setItem("token", accessToken);
        updateUser(userData);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  }
  return (
    <div>
      <AuthLayout>
        <div className="flex lg:w-[70%] h-3/4 md:h-full flex-col  justify-center">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-xs text-slate-600">
            Please enter your details to log in
          </p>
          <form action="" onSubmit={onSubmit}>
            <Input
              value={email}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              value={password}
              label="Password"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {error && <p className="text-red-500 text-sx pb-2.5">{error}</p>}

            <button className="btn-primary" type="submit">
              LOGIN
            </button>

            <p className="text-[13px] text-slate-800 mt-3 ">
              Dont have an account?
              <Link
                className="font-medium text-primary underline ml-2"
                to="/signup"
                href=""
              >
                SignUp
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default login;
