import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function FormUpdateUsers({ selectedUserId }) {
  const userCollectionRef = collection(db, "test_user");

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateUsers = async () => {
    const userDocRef = doc(userCollectionRef, selectedUserId);
    try {
      await updateDoc(userDocRef, {
        name: newName,
        email: newEmail,
        password: newPassword,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-[400px] h-[400px] bg-[#0f111a] rounded-md">
      <h2 className="text-[#ced4da] font-bold text-[24px] ml-auto mr-auto pt-[12px]">
        Update Users
      </h2>
      <div className="flex gap-4 flex-col items-center">
        <input
          type="text"
          placeholder="Tên"
          className="bg-[#262a2f] px-2 py-2 w-[360px] rounded-md"
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-[#262a2f] px-2 py-2 w-[360px] rounded-md"
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-[#262a2f] px-2 py-2 w-[360px] rounded-md"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          className="bg-[#3874ff] hover:bg-[#004dff] text-[14px] w-[120px] h-[35px] text-[#fff] font-bold px-1 rounded-md mt-3"
          onClick={updateUsers}
        >
          Cập nhật User
        </button>
      </div>
    </div>
  );
}
