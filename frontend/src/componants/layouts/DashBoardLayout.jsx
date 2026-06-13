import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import NavBar from "./NavBar";
import SideMinu from "./SideMinu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <NavBar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1024px]:hidden">
            <SideMinu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
