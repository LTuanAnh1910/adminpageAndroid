import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";

import FormUsers from "../components/FormUsers";
import FormUpdateUsers from "../components/FormUpdateUsers";
import { Scrollbar } from "react-scrollbars-custom";

export default function ManagerUser() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Add search term state

  const userCollectionRef = collection(db, "test_user");

  const notify = () => toast("Success Delete!");

  const deleteUsers = async (id) => {
    const userDoc = doc(db, "test_user", id);
    await deleteDoc(userDoc);
    notify();
    window.location.reload();
  };

  const changeInfoUsers = (id) => {
    setSelectedUserId(id);
    setShowFormUpdate(true);
  };

  const handleCloseUpdate = () => {
    setShowFormUpdate(false);
  };

  const handleAdd = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(userCollectionRef);

        let filteredUsers;

        if (searchTerm) {
          // If there's a search term, filter users based on the name
          filteredUsers = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        } else {
          // If there's no search term, display all users
          filteredUsers = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        }

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    getUsers();
  }, [searchTerm, userCollectionRef]);

  return (
    <div className="p-4 flex flex-col gap-2 bg-[#000000] h-[91.86%] text-[#6c7293] text-[15px] ">
      <Scrollbar>
        <h2 className="text-xl font-bold mb-4">Quản lý Users</h2>
        <div className="w-[300px] h-[30px] mb-5  ">
          <input
            className="w-full h-full bg-gray-400 rounded text-[#6c7293] placeholder-gray-500 ml-2 p-2"
            placeholder="Search user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className=" border border-collapse border-[#12151e] items-center ml-auto mr-auto ">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-[#12151e]  border border-[#12151e]">
                ID
              </th>
              {/* <th className="px-6 py-3 bg-[#12151e]  border border-[#12151e]">
                Image
              </th> */}
              <th className="px-6 py-3 bg-[#12151e]  border border-[#12151e]">
                Email
              </th>
              <th className="px-6 py-3 bg-[#12151e]  border border-[#12151e]">
                Name
              </th>
              <th className="px-6 py-3 bg-[#12151e]  border border-[#12151e]">
                Password
              </th>
              <th className="px-6 py-3 bg-[#12151e]  border border-[#12151e]">
                fcmToken
              </th>
              <th className="px-6 py-3 bg-[#12151e]  border border-[#12151e]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border border-[#12151e]">{item.id}</td>
                {/* <td className="px-6 py-4 border border-[#12151e]">
                  <image src={item.image} alt="img" />
                </td> */}
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.email}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.name}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.password}
                </td>
                <td className="px-6 py-4 border border-[#12151e] ">{`${item.fcmToken?.slice(
                  0,
                  18
                )} ...`}</td>
                <td className="px-6 py-4 border border-[#12151e]">
                  <div className="flex items-center gap-3">
                    {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full'>Sửa</button> */}
                    <BiSolidTrash
                      onClick={() => {
                        deleteUsers(item.id);
                      }}
                      size={20}
                      className="text-[#f06548] cursor-pointer hover:text-white "
                    />
                    <BsFillPencilFill
                      onClick={() => {
                        changeInfoUsers(item.id);
                      }}
                      size={18}
                      className="text-[#3874ff] cursor-pointer hover:text-white "
                    />
                    {showFormUpdate && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="p-4 rounded-md shadow-md z-10">
                          <AiOutlineClose
                            size={22}
                            onClick={handleCloseUpdate}
                            className="absolute top-2 right-2 cursor-pointer"
                          />
                          <FormUpdateUsers selectedUserId={selectedUserId} />
                        </div>
                      </div>
                    )}

                    <ToastContainer />
                  </div>
                </td>
                {/* Hiển thị các giá trị từ Firestore tương ứng */}
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className=" flex pt-[28px] pl-4 ">
          <button
            className="bg-[#0ab39c] hover:bg-[#0ddfc2] text-[14px] w-[130px] h-[40px] text-white font-bold  py-1 px-2 rounded-md"
            onClick={handleAdd}
          >
            Thêm User
          </button>
        </div>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="p-4 rounded-md shadow-md z-10">
              <AiOutlineClose
                size={22}
                onClick={handleClose}
                className="absolute top-2 right-2 cursor-pointer"
              />
              <FormUsers />
            </div>
          </div>
        )} */}
      </Scrollbar>
    </div>
  );
}
