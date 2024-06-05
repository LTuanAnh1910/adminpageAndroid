import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidTrash } from "react-icons/bi";
import { Scrollbar } from "react-scrollbars-custom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct"; // Import component EditProduct
import { BsFillPencilFill } from "react-icons/bs";

export default function ManagerPost() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const notify = (message) => toast(message);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      notify("Xoá thành công!");
      fetchProducts(); // Cập nhật lại danh sách sản phẩm
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = "http://localhost:3000/api/products/";
      if (searchTerm !== "") {
        url = `http://localhost:3000/api/products/search/${searchTerm}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentPageProducts = products.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchProducts();
  };

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setIsAddProductModalOpen(false);
  };

  const handleUpdateProduct = (product) => {
    setEditingProduct(product);
    setIsEditProductModalOpen(true);
  };

  console.log(products);

  return (
    <div className="flex flex-col p-4 bg-[#000000] h-[91.86%] text-[14px] text-[#6c7293]">
      <Scrollbar>
        <h2 className="text-xl font-bold mb-4">Quản lý Product</h2>
        <button
          className="mb-4 p-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={() => setIsAddProductModalOpen(true)}
        >
          Thêm sản phẩm
        </button>

        <div className="flex flex-row gap-8 mb-4">
          <input
            className="w-[300px] h-[30px] bg-gray-400 rounded text-[#6c7293] placeholder-gray-500 p-2"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
        <table className="border border-collapse border-[#12151e] items-center ml-auto mr-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                ID
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Tên SP
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Loại sản phẩm
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Giá SP
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Ảnh SP
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Số lượng
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Mô tả
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageProducts.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item._id.slice(0, 16)}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.title}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.category}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {Intl.NumberFormat("en-US").format(item.price)}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  <img
                    className="h-[180px] w-[180px] rounded"
                    src={item.imageUrl}
                    alt="product"
                  />
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.description.slice(0, 30)} ...
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidTrash
                      onClick={() => deleteProduct(item._id)}
                      size={20}
                      className="text-[#f06548] cursor-pointer hover:text-white"
                    />
                    <BsFillPencilFill
                      size={18}
                      className="text-[#3874ff] cursor-pointer hover:text-white"
                      onClick={() => handleUpdateProduct(item)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row justify-end mt-4">
          <ReactPaginate
            previousLabel={"Trước"}
            nextLabel={"Tiếp"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex flex-row"}
            previousClassName={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
            }
            nextClassName={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
            }
            pageClassName={
              "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mx-1 rounded"
            }
            breakClassName={
              "bg-gray-300 text-gray-800 font-bold py-2 px-4 mx-1 rounded"
            }
            disabledClassName={
              "bg-gray-300 text-gray-500 font-bold py-2 px-4 mx-1 rounded"
            }
          />
        </div>

        <div className="text-gray-500 text-sm text-end mt-4">
          Trang {currentPage + 1} trên {pageCount}
        </div>

        {isAddProductModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="p-4 bg-white rounded-md shadow-md z-10">
              <AddProduct
                isOpen={isAddProductModalOpen}
                onClose={() => setIsAddProductModalOpen(false)}
                onAddProduct={addProduct}
              />
            </div>
          </div>
        )}

        {isEditProductModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="p-4 bg-white rounded-md shadow-md z-10">
              <EditProduct
                product={editingProduct}
                isOpen={isEditProductModalOpen}
                onClose={() => setIsEditProductModalOpen(false)}
                onUpdate={() => {
                  fetchProducts(); // Cập nhật lại danh sách sản phẩm sau khi chỉnh sửa
                  setIsEditProductModalOpen(false);
                }}
              />
            </div>
          </div>
        )}
        <ToastContainer />
      </Scrollbar>
    </div>
  );
}
