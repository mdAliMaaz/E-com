import { Container, Loading, Sidebar } from "../components";
import { getSingleOrder, updateOrder } from ".././redux/features/orderSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const EditOrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, orderDetails } = useSelector((state) => state.order);
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(updateOrder(id));
    setTimeout(() => {
      navigate("/admin/orders");
    }, 1000);
  };

  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=' flex'>
          <Sidebar />
          <Container>
            <div className=' border-b-2 mb-5'>
              <h1 className=' text-2xl font-semibold'>Shipping Info</h1>
              <ul className=' text-gray-600'>
                <li>{orderDetails.shippingInfo?.address}</li>
                <li>{orderDetails.shippingInfo?.city}</li>
                <li>{orderDetails.shippingInfo?.state}</li>
                <li>{orderDetails.shippingInfo?.country}</li>
                <li>{orderDetails.shippingInfo?.pinCode}</li>
                <li>{orderDetails.shippingInfo?.phoneNo}</li>
              </ul>
            </div>
            <div className=' border-b-2 mb-5'>
              <h1 className=' text-2xl font-semibold'>User Info</h1>
              <ul className=' text-gray-600'>
                <li>
                  <span className=' text-black font-semibold'>User ID:</span> #
                  {orderDetails.user?._id}
                </li>
                <li>
                  <span className=' text-black font-semibold'>User Name</span>{" "}
                  {orderDetails.user?.name}
                </li>
                <li>
                  <span className=' text-black font-semibold'>User Email</span>{" "}
                  {orderDetails.user?.email}
                </li>
              </ul>
            </div>
            <div className=' border-b-2 mb-5'>
              <h1 className=' text-2xl font-semibold'>Total Amount</h1>
              <span className=' text-green-600 font-semibold'>
                ₹ {orderDetails?.totalPrice}
              </span>
            </div>
            <div className=' border-b-2 mb-5'>
              <h1 className=' text-2xl font-semibold'>Order status</h1>
              <span
                className={
                  orderDetails?.orderStatus === "Processing"
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                <span className=' text-black font-semibold'>Order Status:</span>{" "}
                {orderDetails?.orderStatus}
              </span>
            </div>

            <div className=' border-b-2 mb-5 w-full'>
              <h1 className=' text-2xl font-semibold'>Payment Info</h1>
              <ul className=' text-gray-600'>
                <li>
                  <span className=' text-black font-semibold'>Payment ID:</span>{" "}
                  {orderDetails.paymentInfo?.id}
                </li>
                <li className=' text-green-500'>
                  <span className=' text-black font-semibold'>
                    Payment Status:
                  </span>{" "}
                  {orderDetails.paymentInfo?.status}
                </li>
              </ul>
            </div>
            {orderDetails.orderStatus === "Processing" && (
              <div className=' border-b-2 mb-5'>
                <button
                  onClick={handleClick}
                  className=' px-4 py-2 bg-yellow-500 text-white'
                >
                  Delevired
                </button>
              </div>
            )}
          </Container>
        </div>
      )}
    </>
  );
};

export default EditOrderPage;
