import { Sidebar } from "../components";
import { AiFillGift } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const lineState = {
  labels: ["Initial Amount", "Amount Earned"],
  datasets: [
    {
      label: "TOTAL AMOUNT",
      backgroundColor: ["tomato"],
      hoverBackgroundColor: ["rgb(197, 72, 49)"],
      data: [0, 1000000],
    },
  ],
};

const doughnutState = {
  labels: ["Out of Stock", "InStock"],
  datasets: [
    {
      backgroundColor: ["#00A6B4", "#6800B4"],
      hoverBackgroundColor: ["#4B5000", "#35014F"],
      data: [12, 90, 12],
    },
  ],
};

const Dashboard = () => {
  return (
    <div className=' flex'>
      <Sidebar />
      <div className=' w-full '>
        <h1 className='text-center p-1 text-2xl'>Dashboard</h1>
        <h1 className=' text-center font-semibold bg-orange-500 p-1 text-white text-xl'>
          Total Income
          <span className=' block'>₹2000000</span>
        </h1>
        <div className=' grid grid-cols-1 md:grid-cols-3 place-content-start gap-3'>
          <div className=' w-full flex-col mt-2 shadow-lg p-2  font-semibold uppercase font-mono flex items-center justify-center bg-red-500 text-white rounded-sm'>
            <AiFillGift />
            Products
            <h1>50</h1>
          </div>
          <div className=' w-full flex-col mt-2 shadow-lg p-2  font-semibold uppercase font-mono flex items-center justify-center bg-yellow-500 text-white rounded-sm'>
            Orders
            <h1>50</h1>
          </div>
          <div className=' w-full flex-col mt-2 shadow-lg p-2  font-semibold uppercase font-mono flex items-center justify-center bg-green-700 text-white rounded-sm'>
            <FiUsers />
            Users
            <h1>50</h1>
          </div>
        </div>

        <div className=' mt-3 flex flex-col md:flex-row items-center justify-between p-5'>
          <div className=' w-[300px] lg:w-full lg:flex-1'>
            <Line data={lineState} />
          </div>
          <div className=' w-[300px]'>
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
