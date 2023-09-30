import { Link } from "react-router-dom";
import { Container } from "../components";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";

const LoginPage = () => {
  const [input, setInput] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", input.email);

    formData.append("password", input.password);

    dispatch(login(formData));
  };

  return (
    <Container>
      <form
        className=' w-full h-full flex flex-col space-y-8 items-center justify-center  shadow-lg '
        onSubmit={handleSubmit}
      >
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
            onChange={handleChange}
            name='email'
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
            onChange={handleChange}
            name='password'
          />
        </div>
        <div className=' flex items-center space-x-5'>
          <input
            type='submit'
            value={"Submit"}
            className=' bg-orange-500 text-2xl uppercase px-4 py-2 text-white hover:bg-blue-500 transition-colors shadow-md'
          />
          <Link
            to={"/forgotpassword"}
            className=' mx-2 font-sans text-gray-700'
          >
            forgot password
          </Link>
        </div>
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
