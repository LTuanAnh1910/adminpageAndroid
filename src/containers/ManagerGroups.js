import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidTrash } from "react-icons/bi";
import { Scrollbar } from "react-scrollbars-custom";

export default function ManagerGroups() {
  const [groups, setGroups] = useState([]);

  const userCollectionRef = collection(db, "groups");

  const notify = () => toast("Success Delete!");

  const deleteGroups = async (id) => {
    const userDoc = doc(db, "groups", id);
    await deleteDoc(userDoc);
    notify();
    window.location.reload();
  };

  useEffect(() => {
    const getGroups = async () => {
      const data = await getDocs(userCollectionRef);

      setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getGroups();
  }, []);
  console.log(groups);

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const formattedDate = date.toLocaleDateString("en-US");
    const formattedTime = date.toLocaleTimeString("en-US", { hour12: false }); // Sử dụng { hour12: false } để hiển thị thời gian 24 giờ

    return `${formattedDate} ${formattedTime}`;
  };
  return (
    <div className="flex flex-col p-4 bg-[#000000] h-[91.86%] text-[14px] text-[#6c7293] ">
      <Scrollbar>
        <h2 className="text-xl font-bold mb-4">Quản lý Posts</h2>
        <table className="border border-collapse border-[#12151e] items-center">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                ID
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                Id Admin
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                Image Groups
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                Group Name
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                Last Messgae
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                Time Post
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border border-[#12151e] ">
                  {item.id}
                </td>
                <td className="px-6 py-4 border border-[#12151e] ">
                  {item.adminID}
                </td>

                <td className="px-6 py-4 border border-[#12151e] ">
                  <image src={item.groupImage1} alt="img" />
                </td>
                <td className="px-6 py-4 border border-[#12151e] ">
                  {item.groupName}
                </td>
                <td
                  style={{ width: "400px" }}
                  className="px-6 py-4 border border-[#12151e] "
                >
                  {item.lastMessage}
                </td>
                <td className="px-6 py-4  border border-[#12151e]  ">
                  <div className="flex gap-2 flex-col">
                    <span>{convertTimestampToDate(item.timestamp)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  <div className="flex flex-col items-center gap-2">
                    {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full'>Sửa</button> */}
                    <BiSolidTrash
                      onClick={() => {
                        deleteGroups(item.id);
                      }}
                      size={20}
                      className="text-[#f06548] cursor-pointer hover:text-white "
                    />

                    <ToastContainer />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Scrollbar>
    </div>
  );
}
