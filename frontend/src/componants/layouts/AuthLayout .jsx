import card from "../../assets/authLeftBottomImg1.png";
import { LuTrendingUpDown } from "react-icons/lu";
const AuthLayout = ({ children }) => {
  return (
    <div className="flex ">
      {/* Left panel */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet-50  bg-auth-bg-img bg-no-repeat  bg-cover relative overflow-hidden">
        <StaseInfoCard
          icon={LuTrendingUpDown}
          label="Trake Your Income & Expenses"
          value="300,000"
          color="bg-primary"
        />
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-14 -left-7" />

        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -right-7" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-14 -right-7" />

        <img
          src={card}
          className="w-64 lg:w-[75%] absolute bottom-10 left-1/2 translate-x-[-50%] shadow-lg shadow-blue-400/15"
          alt="expense card preview"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
const StaseInfoCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="bg-white flex flex-row gap-6 absolute top-7 z-10 left-5 rounded-xl p-3 w-[90%]">
      <span
        className={`rounded-full ${color} flex items-center justify-center text-white h-10 w-10`}
      >
        <Icon size={20} />
      </span>
      <div className="flex flex-col ">
        <p className="text-xs text-slate-600 font-semibold">{label}</p>
        <span className="font-semibold">${value}</span>
      </div>
    </div>
  );
};
