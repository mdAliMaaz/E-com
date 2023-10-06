import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../redux/features/cartSlice";
const CartCard = ({ item, i, delBtn }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeItemFromCart(i));
  };
  return (
    <div className=' relative mt-3 flex items-center  justify-between w-full shadow-lg border-2 border-gray-500/20 p-4'>
      <p className=' absolute top-0 left-0 text-[8px] text-gray-500'>
        #{item.product}
      </p>
      {delBtn && (
        <div className=' absolute top-1 right-2 text-red-700 text-xl'>
          <button onClick={handleClick}>
            <AiFillDelete />
          </button>
        </div>
      )}

      <div className='lg:w-1/12 w-1/6 flex  items-center lg:flex-row  gap-2'>
        <img className='w-full' src={item.image.url} alt='product' />
        <div className='w-1/4 lg:w-1/2'>
          <h1 className=' text-xs text-gray-700'> {item.name}</h1>
          <p className='  text-sm text-gray-700'>₹{item.price}</p>
        </div>
      </div>
      <div className=''>
        <p className=' text-sm'>{item.quantity}</p>
      </div>
      <div className='  p-1'>
        <p className=' text-sm text-green-500'>₹{item.quantity * item.price}</p>
      </div>
    </div>
  );
};

export default CartCard;
