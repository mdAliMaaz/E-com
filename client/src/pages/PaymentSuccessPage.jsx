import { Link } from "react-router-dom";
import { Container } from "../components";

const PaymentSuccessPage = () => {
  return (
    <Container>
      <div className=' w-full h-full flex justify-center items-center my-5'>
        <div className='lg:w-full flex items-center justify-center flex-col gap-5'>
          <h1 className=' text-xl lg:text-4xl text-green-500 font-semibold'>
            Payment Successfull
          </h1>
          <Link
            to={"/"}
            className='p-2 text-sm  lg:px-4 lg:py-2 bg-yellow-500 rounded-full text-white hover:bg-yellow-300 transition-all animate-bounce'
          >
            View more
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PaymentSuccessPage;
