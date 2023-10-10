import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidTrash } from "react-icons/bi";
import { Scrollbar } from "react-scrollbars-custom";
import { Timestamp } from "firebase/firestore";

export default function ManagerPost() {
  const [posts, setPosts] = useState([]);

  const userCollectionRef = collection(db, "posts");

  const notify = () => toast("Success Delete!");

  const deletePosts = async (id) => {
    const userDoc = doc(db, "posts", id);
    await deleteDoc(userDoc);
    notify();
    window.location.reload();
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(userCollectionRef);

      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
    console.log(posts);
  }, []);

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
                Id Author
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                Email Author
              </th>
              {/* <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                Image Author
              </th> */}
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                Name Author
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] ">
                Post Text
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
            {posts.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border border-[#12151e] ">
                  {item.id}
                </td>
                <td className="px-6 py-4 border border-[#12151e] ">
                  {item.idAuthor}
                </td>
                <td className="px-6 py-4 border border-[#12151e] ">
                  {item.emailAuthor}
                </td>
                {/* <td className="px-6 py-4 border border-[#12151e] ">
                  <image src={item.imageAuthor} alt="img" />
                </td> */}
                <td className="px-6 py-4 border border-[#12151e] ">
                  {item.nameAuthor}
                </td>
                <td
                  style={{ width: "400px" }}
                  className="px-6 py-4 border border-[#12151e] "
                >
                  {item.postText}
                </td>
                <td className="px-6 py-4  border border-[#12151e]  ">
                  <div className="flex gap-2 flex-col">
                    <span>{convertTimestampToDate(item.postTimestamp)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  <div className="flex flex-col items-center gap-2">
                    {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full'>Sửa</button> */}
                    <BiSolidTrash
                      onClick={() => {
                        deletePosts(item.id);
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
