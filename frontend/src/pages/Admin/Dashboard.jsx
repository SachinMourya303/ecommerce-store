import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IndianRupee, Package, User } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [Orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch Orders
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/myorder/getmyorderproducts');
      setOrders(response.data.products);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/allusers');
      setUsers(response.data.users);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchusers();
  }, []);

  const totalEarnings = Orders.reduce((acc, item) => {
    return acc + (Number(item.price) || 0);
  }, 0);

  const categories = [...new Set(Orders.map(o => o.category))];
  const ordersCount = categories.map(
    cat => Orders.filter(o => o.category === cat).length
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Orders per Category',
        data: ordersCount,
        backgroundColor: 'rgba(99, 102, 241, 0.9)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Orders Distribution by Category' },
    },
  };

  return (
    <div>
      <Toaster />
      <div className="pt-5 px-6 md:p-10 transition-all">
        <ul className="flex gap-5 flex-wrap mb-10 w-full">
          <li className="bg-indigo-500/50 border-2 border-indigo-800 flex flex-col px-10 rounded-lg w-[90%] md:w-[40%]">
            <div className='w-full flex justify-center text-gray-900 pt-5'><Package size={100} /></div>
            <span className="border-b-2 border-indigo-500 py-5 text-4xl truncate text-gray-900 text-center">Total Orders</span>
            <span className="py-5 text-center text-2xl text-gray-900">{Orders.length}</span>
          </li>
          <li className="bg-indigo-500/50 border-2 border-indigo-800 flex flex-col px-10 rounded-lg w-[90%] md:w-[40%]">
            <div className='w-full flex justify-center text-gray-900 pt-5'><User size={100} /></div>
            <span className="border-b-2 border-indigo-500 py-5 text-4xl truncate text-gray-900 text-center">Total Users</span>
            <span className="py-5 text-center text-2xl text-gray-900">{users.length}</span>
          </li>
          <li className="bg-indigo-500/50 border-2 border-indigo-800 flex flex-col px-10 rounded-lg w-[90%] md:w-[40%]">
            <div className='w-full flex justify-center text-gray-900 pt-5'><IndianRupee size={100} /></div>
            <span className="border-b-2 border-indigo-500 py-5 text-4xl truncate text-gray-900 text-center">Total Earnings</span>
            <span className="py-5 text-center text-2xl text-gray-900">
              ₹ {totalEarnings.toLocaleString('en-IN')}
            </span>
          </li>
        </ul>

        <div className="bg-white p-5 border rounded-lg shadow w-full md:w-[70%] mt-20">
          <div className=" w-[250px] md:w-full h-[150px] md:h-[300px]">
            <Bar data={data} options={options} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
