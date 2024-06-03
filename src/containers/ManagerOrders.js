import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiSolidTrash } from "react-icons/bi";
import { Scrollbar } from "react-scrollbars-custom";
import ReactPaginate from "react-paginate";

import axios from "axios";
import moment from "moment";

export default function ManagerPost() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [ordersPerPage] = useState(5); // Number of orders per page

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/order/getOrders"
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  console.log(orders);

  // Logic for displaying current orders
  const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="flex flex-col p-4 bg-[#000000] h-[91.86%] text-[14px] text-[#6c7293]">
      <Scrollbar>
        <h2 className="text-xl font-bold mb-4">Quản lý Orders</h2>
        <table className="border border-collapse border-[#12151e] items-center ml-auto mr-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                ID
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Id người mua
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] w-[400px]">
                Thông tin sản phẩm
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Địa chỉ người nhận
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e] w-[160px]">
                Tổng tiền
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Phương thức thanh toán
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Trạng thái đơn hàng
              </th>
              <th className="px-6 py-3 bg-[#12151e] border border-[#12151e]">
                Thời gian mua hàng
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.reverse().map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item._id.slice(0, 16)}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.userId.slice(0, 16)}
                </td>
                <td className="px-6 py-4 border border-[#12151e] w-[400px]">
                  {item.products.map((product, index) => (
                    <div
                      key={index}
                      className="mb-4 flex flex-row content-center"
                    >
                      <img
                        src={product.cartItem.imageUrl}
                        alt={product.cartItem.title}
                        className="w-[100px] h-[100px]"
                      />
                      <div className="ml-2">
                        <h2 className="text-lg font-semibold">
                          {product.cartItem.title}
                        </h2>
                        <p>Giá: {product.cartItem.price} VND</p>
                        <p>Nhà cung cấp: {product.cartItem.supplier}</p>
                        <p>SL: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {`Người nhận: ${item.shippingAddress.name},
                  SĐT: ${item.shippingAddress.mobileNo},
                  Địa chỉ: ${item.shippingAddress.houseNo}, ${item.shippingAddress.street}, ${item.shippingAddress.district}, ${item.shippingAddress.city}`}
                </td>
                <td className="px-6 py-4 border border-[#12151e] w-[160px]">
                  {Intl.NumberFormat("en-US").format(item.total)} VND
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.payment_status === "cash" ? "Tiền mặt" : "ZaloPay"}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {item.delivery_status}
                </td>
                <td className="px-6 py-4 border border-[#12151e]">
                  {moment(item.createdAt).format("YYYY-MM-DD HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          className="flex flex-end"
          previousLabel={"Trước"}
          nextLabel={"Sau"}
          breakLabel={"..."}
          pageCount={Math.ceil(orders.length / ordersPerPage)}
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
      </Scrollbar>
    </div>
  );
}
