import { DataGrid } from "@mui/x-data-grid";
import { Loading } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { myOrders } from "../redux/features/userSlice";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
const MyOrdersPage = () => {
  const dispatch = useDispatch();

  const { userOrders, isLoading } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) =>
        params.row.status === "Processing" ? "text-red-500" : "text-green-500",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            to={`/orders/${params.id}`}
            className=' hover:text-orange-500 transition-all text-lg'
          >
            <BiSolidEdit />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  !isLoading &&
    userOrders &&
    userOrders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    dispatch(myOrders());
  }, []);

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
      <div>
        <h1 className=' text-center bg-black/90 text-white p-2'>
          {localStorage.getItem("user")}
        </h1>
      </div>
    </main>
  );
};

export default MyOrdersPage;
