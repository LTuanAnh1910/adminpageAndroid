import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [supplier, setSupplier] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [productLocation, setProductLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/products", {
        title,
        supplier,
        price,
        imageUrl,
        description,
        product_location: productLocation,
        category,
      });
      console.log(response.data);
      toast.success("Thêm sản phẩm thành công!");
      onClose();
    } catch (error) {
      console.error("Error adding product", error);
      toast.error("Thêm sản phẩm không thành công!");
    }
  };

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
        <label className="block text-gray-700">Supplier</label>
        <input
          type="text"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
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
        <label className="block text-gray-700">Product Location</label>
        <input
          type="text"
          value={productLocation}
          onChange={(e) => setProductLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
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
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
