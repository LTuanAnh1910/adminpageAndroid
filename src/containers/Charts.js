import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "tailwindcss/tailwind.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export default function RevenueStatistics() {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/revenue/monthly"
        );
        const revenueData = response.data;

        // Ensure data for all 12 months
        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        const fullYearData = months.map((month) => {
          const monthData = revenueData.find((data) => data.month === month);
          return monthData
            ? monthData
            : { month, year: new Date().getFullYear(), totalRevenue: 0 };
        });

        setMonthlyRevenue(fullYearData);

        // Calculate total revenue
        const total = fullYearData.reduce(
          (acc, item) => acc + item.totalRevenue,
          0
        );
        setTotalRevenue(total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRevenueData();
  }, []);

  const data = {
    labels: monthlyRevenue.map((item) => `${item.month}-${item.year}`),
    datasets: [
      {
        label: "(VND)",
        data: monthlyRevenue.map((item) => item.totalRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 40, // Adjust bar thickness here
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Doanh thu theo tháng - Tổng doanh thu: ${totalRevenue.toLocaleString()} VND`,
      },
    },
  };

  return (
    <div className="flex flex-col p-4 bg-[#000000] h-[91.86%] text-[14px] text-[#6c7293]">
      <h2 className="text-xl font-bold mb-4 text-white">
        Thống kê doanh thu theo tháng
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
