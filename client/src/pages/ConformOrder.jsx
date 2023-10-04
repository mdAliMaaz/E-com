import { useState, useEffect } from "react";
import { Container, CartCard } from "../components";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createAnOrder } from "../redux/features/userSlice";

const ConformOrder = () => {
  const dispatch = useDispatch();

  const cartItems = JSON.parse(localStorage.getItem("myCart"));

  const userAddress = JSON.parse(localStorage.getItem("userAdress"));

  const user = localStorage.getItem("user");

  const products = Object.values(cartItems);

  const [grandTotal, setGrandTotal] = useState(0);

  const body = useSelector((state) => state.cart);

  useEffect(() => {
    const products = Object.values(cartItems);

    let total = 0;

    products.map((item) => {
      total += item.quantity * item.price;
    });
    setGrandTotal(total);
  }, [cartItems]);

  const shippingInfo = JSON.parse(localStorage.getItem("userAdress"));

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51NwolvSGWoYo4XbtLifRatfZuj7mIBFE3sGESlPk5GWmjiieTzKnExvBWqh8Y2HzURPPYnYnZhH7ncr9cx7DLaKD00H4QYO0j3"
    );

    const response = await fetch("http://localhost:5000/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const session = await response.json();

    const orderInfo = {
      itemsPrice: body[0].price,
      taxPrice: body[0].price / 2,
      shippingPrice: 500,
      totalPrice: grandTotal,
      orderItems: body,
      shippingInfo,
      paymentInfo: {
        id: session.id,
        status: "succeeded",
      },
    };

    dispatch(createAnOrder(orderInfo));

    localStorage.removeItem("myCart");

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <Container>
      <div className=' flex flex-col lg:flex-row    gap-6'>
        <div className=' flex-1'>
          {/* Left */}
          <div className='w-fll '>
            <h1 className=' my-2 text-2xl'>Your Cart items</h1>
            {products.map((items, i) => (
              <CartCard item={items} key={i} i={i} delBtn={false} />
            ))}
          </div>
          <div className=' text-xs border-b-2 lg:border-none'>
            <h1 className=' my-2 text-2xl'> Shipping Address</h1>
            <div className=' mb-2  flex items-center gap-2 text-gray-700'>
              <h1 className=' text-black'>Name:</h1>
              <h1>{user}</h1>
            </div>
            <div className='  mb-2 flex items-center gap-2 text-gray-700'>
              <h1 className=' text-black'>Phone No:</h1>
              <h1>{userAddress.pNumber}</h1>
            </div>
            <div className='  mb-2 flex items-center gap-2 text-gray-700'>
              <h1 className=' text-black'>Address:</h1>
              <h1>
                {userAddress.address}, {userAddress.city} ,{userAddress.state},{" "}
                {userAddress.country}, {userAddress.pinCode}
              </h1>
            </div>
          </div>
        </div>
        <div className=' flex-1 '>
          {/* right */}
          <div className=' border-b-2'>
            <h1 className=' my-2 text-2xl text-center'>Order Summary</h1>
          </div>
          <div className=' flex items-center justify-between my-2 border-b-2'>
            <h1 className=' font-semibold'>SubTotal:</h1>
            <h1 className=' text-green-500'>₹ {grandTotal}</h1>
          </div>
          <div className=' flex items-center justify-between my-2 border-b-2'>
            <h1 className=' font-semibold'>Shipping cost: </h1>
            <h1 className=' text-green-500'>₹{grandTotal < 1000 ? 500 : 0}</h1>
          </div>
          <div className=' flex items-center justify-between my-2  border-b-2'>
            <h1 className=' font-semibold'>GST: </h1>
            <h1 className=' text-green-500'>₹760</h1>
          </div>
          <div className=' flex items-center'>
            <button
              onClick={makePayment}
              className='p-2 text-sm  lg:px-4 lg:py-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-300 transition-colors'
            >
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ConformOrder;
