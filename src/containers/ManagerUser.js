import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";

import FormUpdateUsers from "../components/FormUpdateUsers";
import { Scrollbar } from "react-scrollbars-custom";
import axios from "axios";

export default function ManagerUser() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log(userData);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/");
        setUserData(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(userData);
    } else {
      const results = userData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    }
  }, [searchTerm, userData]);

  const handleUpdateUser = (user) => {
    setSelectedUser(user);
    setShowFormUpdate(true);
  };

  const handleCloseUpdate = () => {
    setShowFormUpdate(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setUserData(userData.filter((user) => user._id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user._id !== id));
      toast.success("Xoá user thành công!");
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Xoá user không thành công!");
    }
  };

  return (
    <div className="p-4 flex flex-col gap-2 bg-[#000000] h-[91.86%] text-[#6c7293] text-[15px]">
      <Scrollbar>
        <h2 className="text-xl font-bold mb-4">Quản lý Users</h2>
        <div className="w-[300px] h-[30px] mb-5">
          <input
            className="w-full h-full bg-gray-400 rounded text-[#6c7293] placeholder-gray-500 ml-2 p-2"
            placeholder="Search user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="border border-collapse border-[#12151e] items-center ml-auto mr-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                ID
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Email
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Họ tên
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Mật khẩu
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Số địa chỉ
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Xác thực
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item._id.slice(0, 16)}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.email}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.name}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.password}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.addresses.length}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.verified ? "True" : "False"}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  <div className="flex items-center gap-3">
                    <BiSolidTrash
                      size={20}
                      className="text-[#f06548] cursor-pointer hover:text-white"
                      onClick={() => handleDeleteUser(item._id)}
                    />
                    <BsFillPencilFill
                      size={18}
                      className="text-[#3874ff] cursor-pointer hover:text-white"
                      onClick={() => handleUpdateUser(item)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showFormUpdate && selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="p-4 bg-white rounded-md shadow-md z-10">
              <AiOutlineClose
                size={22}
                className="absolute top-2 right-2 cursor-pointer"
                onClick={handleCloseUpdate}
              />
              <FormUpdateUsers
                user={selectedUser}
                onClose={handleCloseUpdate}
              />
            </div>
          </div>
        )}
        <ToastContainer />
      </Scrollbar>
    </div>
  );
}
