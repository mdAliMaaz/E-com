import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { LiaShopware } from "react-icons/lia";
import { useState } from "react";

const links = [
  {
    href: "/",
    title: "Home",
  },

  {
    href: "/products",
    title: "Products",
  },
  {
    href: "/login",

    title: (
      <div className=' relative'>
        <div className=' absolute bg-teal-600 w-2 h-2 top-1 right-1 animate-ping rounded-full'></div>
        <BiUserCircle className=' text-2xl ' />
      </div>
    ),
  },
  {
    href: "/cart",
    title: <AiOutlineShoppingCart className=' text-2xl' />,
  },
];

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <nav className='w-full  px-8 py-4 shadow-sm bg-slate-900 text-white '>
      <div className=' flex items-center justify-between'>
        <Link to={"/"}>
          <div className='text-2xl lg:text-3xl flex gap-2 items-center'>
            {/* left side */}

            <h1 className=' uppercase'>E-Com</h1>
            <LiaShopware />
          </div>
        </Link>

        <div
          className=' text-2xl lg:hidden'
          onClick={() => setMenu((prev) => !prev)}
        >
          {/* right side for mobile */}
          {menu ? <AiOutlineClose /> : <FaBars />}
        </div>
        {/* mobile menu */}
        {menu && (
          <div
            className=' bg-slate-900 absolute top-24 right-10  lg:hidden h-1/2 w-1/2 flex flex-col
        justify-center items-center gap-10 shadow-lg rounded-md z-50
        '
          >
            {links.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.title}
              </Link>
            ))}
          </div>
        )}
        <div className='hidden lg:flex space-x-5'>
          {/* right side for laptop */}
          {links.map((item) => (
            <Link key={item.href} to={item.href}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
