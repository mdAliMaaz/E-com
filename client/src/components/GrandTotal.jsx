import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GrandTotal = () => {
  const [grandTotal, setGrandTotal] = useState(0);

  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const products = Object.values(cartItems);

    let total = 0;

    products.map((item) => {
      total += item.quantity * item.price;
    });
    setGrandTotal(total);
  }, [cartItems]);

  return (
    <div className=' w-full  my-3 flex items-center justify-between'>
      <div>
        <p className=' text-rightfont-semibold'>
          Grand Total : <span className=' text-green-500'> ₹ {grandTotal}</span>
        </p>
      </div>
      <div>
        <Link
          to={"/checkout"}
          className=' p-2 text-sm  lg:px-4 lg:py-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-300 transition-colors'
        >
          Check out
        </Link>
      </div>
    </div>
  );
};

export default GrandTotal;
