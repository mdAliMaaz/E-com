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
import { Loading } from ".././components";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from ".././redux/features/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from ".././redux/features/userSlice";
import { getAllOrders } from ".././redux/features/orderSlice";

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

const Dashboard = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state.products);
  const { allUsers } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  // checking for outofstock products
  let outOfStock = 0;
  data.products &&
    data.products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, orders.totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [
          outOfStock,
          data.productCount && data?.productCount - outOfStock,
        ],
      },
    ],
  };

  useEffect(() => {
    dispatch(getProducts({}));
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=' flex'>
          <Sidebar />
          <div className=' w-full '>
            <h1 className='text-center p-1 text-2xl'>Dashboard</h1>
            <h1 className=' text-center font-semibold bg-orange-500 p-1 text-white text-xl'>
              Total Income
              <span className=' block'>₹{orders.totalAmount}</span>
            </h1>
            <div className=' grid grid-cols-1 md:grid-cols-3 place-content-start gap-3'>
              <Link
                to={"/admin/products"}
                className=' w-full flex-col mt-2 shadow-lg p-2  font-semibold uppercase font-mono flex items-center justify-center bg-red-500 text-white rounded-sm'
              >
                <AiFillGift />
                Products
                <h1 className=' text-2xl'>{data && data?.productCount}</h1>
              </Link>
              <Link
                to={"/admin/orders"}
                className=' w-full flex-col mt-2 shadow-lg p-2  font-semibold uppercase font-mono flex items-center justify-center bg-yellow-500 text-white rounded-sm'
              >
                Orders
                <h1 className=' text-2xl'>
                  {Object.keys(orders.orders).length}
                </h1>
              </Link>
              <Link
                to={"/admin/users"}
                className=' w-full flex-col mt-2 shadow-lg p-2  font-semibold uppercase font-mono flex items-center justify-center bg-green-700 text-white rounded-sm'
              >
                <FiUsers />
                Users
                <h1 className=' text-2xl'>{Object.values(allUsers)?.length}</h1>
              </Link>
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
      )}
    </>
  );
};

export default Dashboard;
