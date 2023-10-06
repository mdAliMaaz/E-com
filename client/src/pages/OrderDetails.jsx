import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleOrder } from "../redux/features/userSlice";
import { useParams } from "react-router-dom";
import { CartCard, Container, Loading } from "../components";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleOrder, isLoading } = useSelector((state) => state.user);

  console.log(singleOrder);
  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {singleOrder && (
            <div>
              <div className=' border-b-2'>
                <h1 className='text-normal lg:text-3xl text-orange-500 text-left'>
                  # {id}
                </h1>
              </div>
              {/* shipping info */}
              <div className=' flex  flex-col w-full p-2 border-b-2'>
                <h1 className=' text-2xl font-semibold text-orange-500'>
                  Shipping Info
                </h1>
                <div className=' flex items-center gap-3 my-1'>
                  <h1 className=' font-semibold'>Name:</h1>
                  <span className=' text-sm text-gray-600'>
                    {localStorage.getItem("user")}
                  </span>
                </div>
                <div className=' flex items-center gap-3 my-1'>
                  <h1 className=' font-semibold'>Phone:</h1>
                  <span className=' text-sm text-gray-600'>
                    {singleOrder.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className=' flex items-center gap-3 my-1'>
                  <h1 className=' font-semibold'>Address:</h1>
                  <span className=' text-sm text-gray-600'>
                    {singleOrder && singleOrder.shippingInfo.address} ,
                    {singleOrder.shippingInfo.city},
                    {singleOrder.shippingInfo.state}
                    {singleOrder.shippingInfo.country},
                    {singleOrder.shippingInfo.pinCode}
                  </span>
                </div>
              </div>
              {/* payment */}
              <div className=' flex  flex-col w-full p-2 border-b-2'>
                <h1 className=' text-2xl font-semibold text-orange-500'>
                  Payment
                </h1>
                <div className=' flex items-center gap-3 my-1'>
                  <h1 className=' font-semibold'>Amount:</h1>
                  <span className=' text-sm text-gray-600'>
                    ₹{singleOrder.totalPrice}
                  </span>
                </div>
                <div className=' flex items-center gap-3 my-1'>
                  <h1 className=' font-semibold text-green-500'>
                    {singleOrder.paymentInfo.status === "succeeded" && "PAID"}
                  </h1>
                </div>
              </div>
              {/* Order status */}
              <div className=' flex  flex-col w-full p-2 border-b-2'>
                <h1 className=' text-2xl font-semibold text-orange-500'>
                  Order status
                </h1>
                <span className=' text-sm text-gray-600'>
                  {singleOrder.orderStatus}
                </span>
              </div>

              {/* order items */}
              <div className=' flex  flex-col w-full p-2 border-b-2'>
                <h1 className=' text-2xl font-semibold text-orange-500'>
                  Order Items
                </h1>
                <div className=' grid grid-cols-1 lg:grid-cols-2 gap-1 text-sm text-gray-600  '>
                  {singleOrder.orderItems.map((item, i) => (
                    <CartCard item={item} key={i} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default OrderDetails;
