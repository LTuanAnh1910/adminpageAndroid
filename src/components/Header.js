import logo from "../assest/pokemon2.jpg";
import { PiBellRinging } from "react-icons/pi";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";

export default function Header() {
  return (
    <div className="bg-[#191c24] w-full h-[70px] flex items-center justify-between ">
      <div className="">
        <input
          type="search"
          className=" flex h-[20px] w-[500px] p-[20px] text-[14px] bg-[#12151e] border border-gray-400 ml-[60px] rounded-md items-center"
          placeholder="Search for this..."
        />
      </div>

      <div className="flex gap-[60px] items-center cursor-pointer">
        <div className="flex gap-10">
          <AiOutlineMenu size={20} className="text-[#ffffff]" />
          <FiMessageCircle size={20} className="text-[#ffffff]" />
          <PiBellRinging size={20} className="text-[#ffffff]" />
        </div>
        <div className="flex gap-2 items-center mr-[48px]">
          <img
            src={logo}
            className="w-[35px] h-[35px] object-cover  rounded-full"
          />
          <h3 className="text-white text-[15px]">Admin</h3>
        </div>
      </div>
    </div>
  );
}
