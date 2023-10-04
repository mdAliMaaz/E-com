import { Link } from "react-router-dom";

import { BiSolidDashboard } from "react-icons/bi";
import { AiFillGift } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { FaRegGrinStars } from "react-icons/fa";
import { MdOutlineTransferWithinAStation } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className=' hidden lg:flex w-1/6 bg-slate-900 h-screen   flex-col text-white gap-10 p-2'>
      <Link
        className=' flex items-center gap-1 hover:text-orange-500 transition-colors'
        to='/admin/dashboard'
      >
        Dashboard
        <BiSolidDashboard />
      </Link>
      <Link
        className=' flex items-center gap-1 hover:text-orange-500 transition-colors'
        to='/admin/products'
      >
        Products
        <AiFillGift />
      </Link>
      <Link
        className=' flex items-center gap-1 hover:text-orange-500 transition-colors'
        to='/admin/users'
      >
        Users
        <FiUsers />
      </Link>
      <Link
        className=' flex items-center gap-1 hover:text-orange-500 transition-colors'
        to='/admin/orders'
      >
        Orders
        <MdOutlineTransferWithinAStation />
      </Link>
      <Link
        className=' flex items-center gap-1 hover:text-orange-500 transition-colors'
        to='/admin/reviews'
      >
        Reviews
        <FaRegGrinStars />
      </Link>
    </div>
  );
};

export default Sidebar;
