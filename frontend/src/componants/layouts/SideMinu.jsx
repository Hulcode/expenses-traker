import { SIDE_MENU_DATA } from "../../utils/date";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../../componants/cards/UserAvatar";
const SideMinu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleClick(route) {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  }

  function handleLogout() {
    clearUser();
    navigate("/login");
    localStorage.clear();
  }
  return (
    <div className="w-60 h-[calc(100vh-62px)]  bg-white  px-4  shadow py-4">
      <div className="w-full flex justify-center flex-col items-center gap-3 ">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl || ""}
            alt={user.fullName}
            className="h-20 w-20 rounded-full object-cover "
          />
        ) : (
          <UserAvatar
            fullName={user?.fullName}
            width="w-20 "
            height="h-20"
            style="text-xl"
          ></UserAvatar>
        )}
        <h2 className="text-black font-semibold">{user?.fullName}</h2>
      </div>

      <div className="mt-7 w-full flex justify-center flex-col">
        {SIDE_MENU_DATA.map((nav, index) => {
          return (
            <button
              onClick={() => {
                handleClick(nav.path);
              }}
              key={index}
              className={`flex gap-4 text-[15px] mb-3 ${activeMenu === nav.label ? "bg-primary text-white" : " text-black"} rounded-xl px-6 py-4 w-full items-center`}
            >
              <nav.icon className="text-xl" />
              {nav.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMinu;
