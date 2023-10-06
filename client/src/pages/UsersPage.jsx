import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from ".././redux/features/adminSlice";
import { Sidebar, Loading } from "../components";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { updateRole } from ".././redux/features/adminSlice";

const UsersPage = () => {
  const columns = [
    {
      field: "profile",
      headerName: "Avatar",
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className=' p-5'>
            <img
              src={params.row.profile}
              className=' rounded-full h-14 w-14 object-cover'
            />
          </div>
        );
      },
    },
    {
      field: "id",
      headerName: "User ID",
      minWidth: 300,
      flex: 1,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email Address",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <button
            onClick={() => dispatch(updateRole(params.row.id))}
            className={`py-1 px-3 ${
              params.row.role === "admin" ? "bg-green-500" : "bg-orange-500"
            }  text-white  rounded-sm`}
          >
            {params.row.role.toUpperCase()}
          </button>
        );
      },
    },
  ];

  const rows = [];

  const { isLoading, data } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  !isLoading &&
    data &&
    data.forEach((item) => {
      rows.push({
        profile: item.avatar.url,
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
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
          </div>
        </div>
      )}
    </>
  );
};

export default UsersPage;
UsersPage;
