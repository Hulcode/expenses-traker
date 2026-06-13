import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Input = ({ value, placeholder, type, onChange, label }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex-1">
      <label htmlFor="input" className="text-slate-800 text-[13px] ">
        {label}
      </label>
      <div className="input-box ">
        <input
          id="input"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="outline-none w-full bg-slate-50"
        />
        {type === "password" && (
          <button
            className="cursor-pointer "
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <FaEye size={22} className="text-primary" />
            ) : (
              <FaEyeSlash size={22} className="text-slate-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
