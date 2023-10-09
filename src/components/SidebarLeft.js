import logo from "../assest/logo.svg";
import logo2 from "../assest/pokemon2.jpg";
import { NavLink } from "react-router-dom";
import { IoSpeedometerOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsThreeDotsVertical, BsFillPersonCheckFill } from "react-icons/bs";
import { AiOutlineUsergroupDelete } from "react-icons/ai";

export default function SidebarLeft() {
  return (
    <div className="flex gap-2 flex-col ">
      <div className="flex justify-center items-center">
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-[124px] h-[70px]" />
        </NavLink>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <NavLink to="/">
          <div className="flex items-center justify-center gap-2 pb-[40px]">
            <img
              src={logo2}
              className="w-[35px] h-[35px] object-cover  rounded-full"
            />
            <h3 className="text-[#6c7293] text-sm font-semibold">
              Admin Dashboard
            </h3>
          </div>
        </NavLink>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center hover:text-[#ffffff] ">
        <div className="flex gap-2 w-[224px] h-[46px] text-[15px] items-center cursor-pointer  ">
          <BsFillPersonCheckFill className="text-[#6c7293]" size={24} />
          <NavLink
            to="/user"
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#6c7293",
            })}
          >
            Quản lý Users
          </NavLink>
        </div>
        <div className="flex gap-2 w-[224px] h-[46px] text-[15px] items-center cursor-pointer ">
          <HiOutlineClipboardDocumentList
            className="text-[#6c7293]"
            size={24}
          />
          <NavLink
            to="/post"
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#6c7293",
            })}
          >
            Quản lý Posts
          </NavLink>
        </div>
        <div className="flex gap-2 w-[224px] h-[46px] text-[15px] items-center cursor-pointer ">
          <AiOutlineUsergroupDelete className="text-[#6c7293]" size={24} />
          <NavLink
            to="/groups"
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#6c7293",
            })}
          >
            Quản lý Groups
          </NavLink>
        </div>
      </div>
    </div>
  );
}
