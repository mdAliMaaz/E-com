import { Link } from "react-router-dom";
import { Container } from "../components";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";

const LoginPage = () => {
  return (
    <Container>
      <form className=' w-full h-full flex flex-col space-y-8 items-center justify-center  shadow-lg '>
        <h1 className='text-3xl lg:text-5xl uppercase mt-5 font-mono'>
          Log in
        </h1>

        <div className='lg:p-5 flex justify-between lg:w-1/2 items-center gap-5  border-b-gray-600'>
          <span>
            <AiOutlineMail className=' text-2xl lg:text-5xl text-gray-700' />
          </span>
          <input
            type='text'
            placeholder='Email'
            className=' px-2 lg:px-4 py-2 w-full border-2 border-black active:border-none font-mono'
          />
        </div>

        <div className='lg:p-5 flex justify-between lg:w-1/2 items-center gap-5  border-b-gray-600'>
          <span>
            <AiFillLock className=' text-2xl lg:text-5xl text-gray-700' />
          </span>
          <input
            type='password'
            placeholder='Password'
            className=' px-2 lg:px-4 py-2 w-full border-2 border-black active:border-none font-mono'
          />
        </div>
        <input
          type='submit'
          value={"Submit"}
          className=' bg-orange-500 text-2xl uppercase px-4 py-2 text-white hover:bg-blue-500 transition-colors shadow-md'
        />
        <div>
          <span className=' lg:text-lg text-gray-600'>
            Don't have an account ?{" "}
            <Link className=' text-blue-500' to={"/register"}>
              click here
            </Link>
          </span>
        </div>
      </form>
    </Container>
  );
};

export default LoginPage;
