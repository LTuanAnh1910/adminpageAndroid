import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormUpdateUsers = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [verified, setVerified] = useState(user.verified);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${user._id}`,
        {
          name,
          email,
          password,
          verified,
        }
      );
      console.log(response.data);
      toast.success("Cập nhật user thành công!");
      onClose();
    } catch (error) {
      console.error("Error updating user", error);
      toast.error("Cập nhật user không thành công!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 w-[280px] bg-white rounded shadow-md"
    >
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Verified</label>
        <select
          value={verified}
          onChange={(e) => setVerified(e.target.value === "true")}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Update User
      </button>
    </form>
  );
};

export default FormUpdateUsers;
