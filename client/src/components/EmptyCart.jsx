import { TbGardenCartOff } from "react-icons/tb";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className=' mt-4 w-full flex items-center justify-center flex-col gap-5'>
      <h1 className='text-2xl lg:text-5xl'>No Products in Cart</h1>
      <TbGardenCartOff className='text-2xl lg:text-5xl text-yellow-500' />
      <Link to={"/products"} className=' px-6 py-2 bg-black text-white'>
        View Products
      </Link>
    </div>
  );
};

export default EmptyCart;
