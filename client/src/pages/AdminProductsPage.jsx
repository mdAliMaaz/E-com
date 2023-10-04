import { Loading, Sidebar } from "../components";
import { getProducts } from ".././redux/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";

const AdminProductsPage = () => {
  const dispatch = useDispatch();

  const { isLoading, data } = useSelector((state) => state.products);

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 300,
      flex: 1,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "category",
      headerName: "Category",
      type: "string",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "stock",
      flex: 0.3,
      headerName: "Stock",
      minWidth: 150,
      type: "number",
      sortable: false,
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "Action",
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
  data.products?.forEach((item, index) => {
    rows.push({
      name: item.name,
      id: item._id,
      price: item.price,
      stock: item.stock,
      category: item.category,
    });
  });

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
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
            <div className=' flex justify-end absolute top-4 left-[12rem]'>
              <Link
                to={"add"}
                className='  bg-orange-500 text-white p-2 text-2xl  rounded-full hover:bg-orange-300 transition-colors'
              >
                <IoAdd />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
