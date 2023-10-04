import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getUserInfo } from "../redux/features/userSlice";

import { Container, Loading } from "../components";

import { Link } from "react-router-dom";

import { logout } from "../redux/features/authSlice";

const UserProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const { data, isLoading, isError } = useSelector((state) => state.user);

  let image = data.avatar;
  image = { ...image };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <p className=' text-right text-sm mt-2 text-gray-500'># {data._id}</p>
          <h1 className=' text-4xl text-center text-orange-600 uppercase font-mono mx-4 font-semibold'>
            User Info
          </h1>
          <div className=' mt-10 flex flex-col lg:flex-row items-center justify-evenly space-y-10 p-2'>
            {/* left */}
            <div className=' flex flex-col space-y-5 items-center justify-evenly'>
              <div className=' border-2 border-orange-500 rounded-full p-1 m-auto'>
                <img
                  className='w-40 h-40 rounded-full object-cover'
                  src={image.url}
                  alt=''
                />
              </div>
              <div className=' flex flex-col lg:flex-row items-center justify-between gap-3'>
                <Link
                  to={"edit"}
                  className=' px-6 py-2 bg-red-500 text-white hover:bg-red-300 transition-colors '
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className=' px-6 py-2 bg-red-500 text-white hover:bg-red-300 transition-colors '
                >
                  Logout
                </button>
              </div>
            </div>
            {/* right */}
            <div className='mt-3'>
              <div className=' flex items-center space-x-5 border-b-2 border-gray-800 mb-3'>
                <h1 className=' lg:text-2xl capitalize font-semibold text-gray-900'>
                  Name:
                </h1>
                <h1 className=' lg:text-2xl capitalize'>{data.name}</h1>
              </div>
              <div className=' flex items-center space-x-5 border-b-2 border-gray-800'>
                <h1 className=' lg:text-2xl capitalize font-semibold text-gray-900'>
                  Email:
                </h1>
                <h1 className=' lg:text-2xl '>{data.email}</h1>
              </div>
              <div className=' flex flex-col lg:flex-row gap-4 items-center justify-between mt-10'>
                <Link
                  to={"/myorders"}
                  className=' px-5 py-2 bg-orange-500 text-white hover:bg-orange-300 transition-colors'
                >
                  Orders
                </Link>
                <Link
                  to={"changepassword"}
                  className=' px-5 py-2 bg-orange-500 text-white hover:bg-orange-300 transition-colors'
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default UserProfilePage;
