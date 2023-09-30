import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";
import { BsFillKeyFill } from "react-icons/bs";

import { Container } from "../components";
import { useState } from "react";

import { resetPassword } from "../redux/features/authSlice";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();

  const { token } = useParams();

  const [input, setInput] = useState({
    password: "",
    conformPassword: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", input.password);
    formData.append("conformPassword", input.conformPassword);

    dispatch(resetPassword({ formData, token }));
    
  };
  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className=' w-full h-full flex flex-col  items-center justify-center  shadow-lg '
      >
        <h1 className='text-3xl lg:text-5xl uppercase mt-5 font-mono'>
          Reset Password
        </h1>

        <div className='lg:p-5 flex justify-between lg:w-1/2 items-center gap-5  border-b-gray-600'>
          <span>
            <BsFillKeyFill className=' text-2xl lg:text-5xl text-gray-700' />
          </span>
          <input
            type='password'
            placeholder='New password'
            className=' px-2 lg:px-4 py-2 w-full border-2 border-black active:border-none font-mono'
            name='password'
            onChange={handleChange}
          />
        </div>
        <div className='lg:p-5 flex justify-between lg:w-1/2 items-center gap-5  border-b-gray-600'>
          <span>
            <AiFillLock className=' text-2xl lg:text-5xl text-gray-700' />
          </span>
          <input
            type='password'
            placeholder='Conform Password'
            className=' px-2 lg:px-4 py-2 w-full border-2 border-black active:border-none font-mono'
            name='conformPassword'
            onChange={handleChange}
          />
        </div>
        <input
          type='submit'
          value={"Submit"}
          className=' bg-orange-500 text-2xl uppercase px-4 py-2 text-white hover:bg-blue-500 transition-colors shadow-md'
        />
      </form>
    </Container>
  );
};

export default ResetPasswordPage;
