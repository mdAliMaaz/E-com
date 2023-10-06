import { Sidebar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from ".././redux/features/orderSlice";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

const OrdersPage = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      flex: 1,
    },

    {
      field: "user",
      headerName: "User ID",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      minWidth: 150,
      renderCell: ({ row }) => {
        return (
          <span className=' text-green-500 font-semibold'>
            {row.totalPrice}
          </span>
        );
      },
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      minWidth: 150,
      renderCell: ({ row }) => {
        return (
          <span
            className={
              row.orderStatus === "Processing"
                ? "text-red-500"
                : "text-green-500"
            }
          >
            {row.orderStatus}
          </span>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      flex: 0.3,
      renderCell: ({ row }) => {
        return (
          <Link to={`/admin/orders/${row.id}`}>
            <AiFillEdit className=' text-2xl hover:text-orange-500 transition-colors' />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  Object.values(orders.orders).forEach((item) => {
    let singleRow = {
      id: item._id,
      user: item.user,
      totalPrice: item.totalPrice,
      orderStatus: item.orderStatus,
      createdAt: item.createdAt,
    };
    rows.push(singleRow);
  });

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);
  return (
    <div className=' flex'>
      <Sidebar />
      <div className=' w-full'>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default OrdersPage;
