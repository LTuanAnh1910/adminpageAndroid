import React from "react";
import { Routes, Route } from "react-router-dom";

import SidebarLeft from "../components/SidebarLeft";
import ManagerPost from "./ManagerPost";
import ManagerUser from "./ManagerUser";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";

export default function Home() {
  return (
    <div className="flex flex-row h-screen bg-[#000000]">
      <div className="w-[244px] bg-[#1a1c24] h-full">
        <SidebarLeft />
      </div>

      <div className="flex-auto h-full w-3/4">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
