import AuthLayout from "../../componants/layouts/AuthLayout ";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import Input from "../../componants/inputs/Input";
import ImageInput from "../../componants/inputs/ImageInput";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/paths";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import uploadImage from "../../utils/uploadImage.js";
const SignUp = () => {
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  async function onSubmit(e) {
    e.preventDefault();
    if (!userName) {
      setError("Please enter your name");
      return;
    }
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
      let imageUrl = "";

      if (image) {
        const imageUpload = await uploadImage(image);
        imageUrl = imageUpload.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        email,
        password,
        fullName: userName,
        profileImageUrl: imageUrl,
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
        <div className="flex lg:w-full h-3/4 md:h-full flex-col  justify-center">
          <h2 className="text-2xl font-bold">Create An Account</h2>
          <p className="text-xs text-slate-600">
            Join us today by entering your details below
          </p>
          <ImageInput image={image} setImage={setImage} />
          <form action="" className="" onSubmit={onSubmit}>
            <div className="flex flex-row w-full gap-4 ">
              <Input
                value={userName}
                label="Full Name"
                placeholder="john"
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <Input
                value={email}
                label="Email Address"
                placeholder="john@example.com"
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

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
              SIGNUP
            </button>

            <p className="text-[13px] text-slate-800 mt-3 ">
              Already have an account?
              <Link
                className="font-medium text-primary underline ml-2"
                to="/login"
                href=""
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
