import axios from "axios";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditProduct({ product, isOpen, onClose, onUpdate }) {
  const [title, setTitle] = useState("");

  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    if (isOpen) {
      setTitle(product.title);
      setCategory(product.category);
      setPrice(product.price);
      setImageUrl(product.imageUrl);
      setDescription(product.description);
      setQuantity(product.quantity);
    }
  }, [isOpen, product]);

  const notify = (message) => toast(message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      title,
      category,
      price,
      imageUrl,
      description,
      quantity,
    };

    try {
      await axios.put(
        `http://localhost:3000/api/products/${updatedProduct._id}`,
        updatedProduct
      );
      notify("Cập nhật thành công!");
      onUpdate(); // Gọi lại hàm cập nhật danh sách sản phẩm từ component cha
      onClose(); // Đóng modal
    } catch (error) {
      console.error(error);
      notify("Update Failed!");
    }
  };
  if (!isOpen) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 w-[400px] bg-white rounded shadow-md"
    >
      <div>
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700">Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
        ></textarea>
      </div>

      <div>
        <label className="block text-gray-700">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700">Số lượng</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        className="p-2  bg-blue-500 text-white rounded hover:bg-blue-700"
        type="submit"
      >
        Cập nhật sản phẩm
      </button>
      <button
        className="p-2  bg-red-500 text-white rounded hover:bg-red-700"
        type="button"
        onClick={onClose}
      >
        Huỷ
      </button>
    </form>
  );
}
